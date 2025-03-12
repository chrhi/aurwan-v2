"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllWilayats, getCommunesByWilaya } from "@/lib/utils";
import { Commune } from "@/types";
import { createOrder } from "@/actions/order.actions";
import { useRouter } from "next/navigation";

// Define the form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "الاسم الكامل يجب أن يكون على الأقل حرفين.",
  }),
  phoneNumber: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام.",
  }),
  wilaya: z.string({
    required_error: "الرجاء اختيار الولاية.",
  }),
  commune: z.string({
    required_error: "الرجاء اختيار البلدية.",
  }),
  quantity: z.number().min(1, {
    message: "الكمية يجب أن تكون على الأقل 1.",
  }),
});

export function OrderProductForm() {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // Get all wilayats
  const wilayats = getAllWilayats();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      wilaya: "",
      commune: "",
      quantity: 1,
    },
  });

  // Watch for wilaya changes to update communes
  const selectedWilaya = form.watch("wilaya");

  useEffect(() => {
    if (selectedWilaya) {
      try {
        const communesList = getCommunesByWilaya(selectedWilaya);
        setCommunes(communesList);
        // Reset commune selection when wilaya changes
        form.setValue("commune", "");
      } catch (error) {
        console.error("Error fetching communes:", error);
        setCommunes([]);
      }
    } else {
      setCommunes([]);
    }
  }, [selectedWilaya, form]);

  // Define a submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      await createOrder({
        address: "",
        city: values.commune,
        full_name: values.fullName,
        phone_number: Number(values.phoneNumber),
        quantity: values.quantity,
        wilaya_code: Number(values.wilaya),
        wilaya_name:
          wilayats.find((item) => item.code === values.wilaya)?.name ??
          values.wilaya,
      });
      router.push("/thank-you");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الكامل</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل الاسم الكامل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل رقم الهاتف" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الولاية</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wilayats.map((wilaya) => (
                      <SelectItem key={wilaya.code} value={wilaya.code}>
                        {wilaya.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commune"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البلدية</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedWilaya || communes.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر البلدية" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {communes.map((commune) => (
                      <SelectItem
                        key={commune.id}
                        value={commune.name.toString()}
                      >
                        {commune.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الكمية</FormLabel>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newValue = field.value - 1;
                    if (newValue >= 1) {
                      form.setValue("quantity", newValue);
                    }
                  }}
                >
                  -
                </Button>
                <FormControl>
                  <Input
                    type="number"
                    className="w-20 text-center mx-2"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 1) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    form.setValue("quantity", field.value + 1);
                  }}
                >
                  +
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            disabled={loading}
            size="lg"
            type="submit"
            className="w-full h-14 rounded-2xl hover:bg-rose-800 bg-rose-600 font-extrabold text-white"
          >
            اطلب الان
          </Button>
        </div>
      </form>
    </Form>
  );
}
