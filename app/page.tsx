"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FormError } from "@/components/app/form-error"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  siteUrl: z.string().url().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  url: z.string().optional(),
})

export default function Home() {

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteUrl: "",
      url: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);

      const response = await fetch(`/api/url`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          siteUrl: values.siteUrl,
          url: values.url,
        })
      });

      const resData = await response.json();

      // console.log(resData);

      if(resData.error){
        setIsError(resData.error);
      } else{
      
        router.push(`/success?slug=${resData.url}`);
      }

    } catch (error: any) {
      // console.log("error : ",error.error);
      setIsError(error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="mt-10 max-w-lg mx-4 px-4 py-8  rounded-md sm:mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="siteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website Url</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name <small>(Optional)</small></FormLabel>
                <FormControl>
                  <Input placeholder="slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && <FormError message={isError} />}
          <Button type="submit" disabled={loading}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
