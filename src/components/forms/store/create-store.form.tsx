/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  color: z.string().min(4, {
    message: "Please select a color for your store.",
  }),
  lang: z.string({
    required_error: "Please select a language.",
  }),
  subdomain: z
    .string()
    .min(2, {
      message: "Subdomain must be at least 2 characters.",
    })
    .refine((value) => /^[a-z0-9-]+$/.test(value), {
      message:
        "Subdomain can only contain lowercase letters, numbers, and hyphens.",
    }),
});

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ar", label: "Arabic" },
];

const PRESET_COLORS = [
  { value: "#FF5733", label: "Coral" },
  { value: "#33FF57", label: "Mint" },
  { value: "#3357FF", label: "Royal Blue" },
  { value: "#F033FF", label: "Fuchsia" },
  { value: "#FF33A8", label: "Pink" },
  { value: "#33FFF5", label: "Turquoise" },
  { value: "#FFD700", label: "Gold" },
  { value: "#800080", label: "Purple" },
  { value: "#008080", label: "Teal" },
  { value: "#FF4500", label: "Orange Red" },
  { value: "#4B0082", label: "Indigo" },
  { value: "#008000", label: "Green" },
];

export default function CreateStoreForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [customColor, setCustomColor] = useState("#000000");

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "",
      lang: "en",
      subdomain: "",
    },
  });

  // Update the preview when subdomain changes
  useEffect(() => {
    const subdomainValue = form.watch("subdomain");
    setSubdomain(subdomainValue || "yourstore");
  }, [form]);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const response = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create store");
      }

      await response.json();
      toast.success("Store created successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Handle custom color change
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    form.setValue("color", newColor);
  };

  // Select a preset color
  const selectPresetColor = (color: string) => {
    form.setValue("color", color);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Store</CardTitle>
        <CardDescription>
          Create a new store to manage your products and orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Store" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed to your customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Subdomain</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        placeholder="mystore"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setSubdomain(e.target.value || "yourstore");
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="flex items-center text-sm">
                    <span className="font-medium">Preview: </span>
                    <span className="ml-1 text-blue-600">
                      {subdomain}.craftednext.com
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Color</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center justify-start flex-wrap  gap-4 mb-2">
                        {PRESET_COLORS.map((color) => (
                          <div
                            key={color.value}
                            onClick={() => selectPresetColor(color.value)}
                            className={`w-8 h-8 rounded-xl cursor-pointer hover:scale-110 transition duration-200 border-2 ${
                              field.value === color.value
                                ? "border-black"
                                : "border-gray-200"
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.label}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{
                                  backgroundColor: field.value || "#000000",
                                }}
                              />
                              Custom Color
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <input
                                  type="color"
                                  value={field.value || customColor}
                                  onChange={handleCustomColorChange}
                                  className="w-12 h-8 cursor-pointer"
                                />
                                <Input
                                  value={field.value || customColor}
                                  onChange={(e) => {
                                    setCustomColor(e.target.value);
                                    field.onChange(e.target.value);
                                  }}
                                  className="font-mono"
                                  placeholder="#000000"
                                />
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        <div className="text-sm text-gray-500">
                          Selected:{" "}
                          <span className="font-mono">
                            {field.value || "None"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This color will be used for your store&apos;s branding.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The primary language for your store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={loading}
          className="flex items-center"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Store"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
