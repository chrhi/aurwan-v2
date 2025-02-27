"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/product.actions";
import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
  }
);

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number",
  }),
  compareAtPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) || val === "", {
      message: "Compare at price must be a valid number",
    }),
  status: z.string({
    required_error: "Please select a status",
  }),
  mediaUrls: z.array(
    z.string().url({
      message: "Please enter valid URLs",
    })
  ),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function AddProduct() {
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [mediaError, setMediaError] = useState("");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      compareAtPrice: "",
      status: "",
      mediaUrls: [],
    },
  });

  async function onSubmit(values: ProductFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      const formattedValues = {
        description: JSON.parse(values.description),
        price: Number(values.price),
        compareAtPrice: values.compareAtPrice
          ? Number(values.compareAtPrice)
          : 0,
        media: { urls: values.mediaUrls },
        status: values.status,
        title: values.title,
      };

      const result = await createProduct(formattedValues);

      if (result.error) {
        //@ts-expect-error this is an errro
        setError(result?.error);

        console.log(result.error);
        return;
      }

      // Redirect to products page on success
      router.push("/products");
      router.refresh(); // Refresh the page to show new data
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    form.setValue("description", JSON.stringify(rawContent));
  };

  const handleAddMediaUrl = () => {
    try {
      new URL(newMediaUrl);
      setMediaUrls([...mediaUrls, newMediaUrl]);
      form.setValue("mediaUrls", [...mediaUrls, newMediaUrl]);
      setNewMediaUrl("");
      setMediaError("");
    } catch {
      setMediaError("Please enter a valid URL");
    }
  };

  const handleRemoveMediaUrl = (indexToRemove: number) => {
    const updatedUrls = mediaUrls.filter((_, index) => index !== indexToRemove);
    setMediaUrls(updatedUrls);
    form.setValue("mediaUrls", updatedUrls);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-fit min-h-[300px] grid grid-cols-1 gap-4 relative md:grid-cols-3"
      >
        {error && (
          <div className="col-span-full">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="w-full col-span-2 flex flex-col gap-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        toolbarClassName="toolbarClassName bg-gray-50 border rounded-t-xl"
                        wrapperClassName="wrapperClassName border rounded-xl"
                        editorClassName="editorClassName rounded-b-xl p-4 min-h-[200px]"
                        placeholder="Enter product description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter media URL"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleAddMediaUrl}
                  className="whitespace-nowrap"
                >
                  Add URL
                </Button>
              </div>
              {mediaError && (
                <Alert variant="destructive">
                  <AlertDescription>{mediaError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                {mediaUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
                  >
                    <img
                      src={url}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="flex-1 truncate text-sm">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMediaUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compareAtPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compare At Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter compare price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col gap-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose the status of the product</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-[70px] border-t mt-4">
          <MaxWidthWrapper className="flex w-full items-center h-full justify-end gap-x-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/products")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </MaxWidthWrapper>
        </div>
      </form>
    </Form>
  );
}
