"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { backend_url } from "@/helper";
import { ChangeEvent, useState } from "react";
// import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [uploadFile, setUploadFile] = useState<string | Blob>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  // copy link to clipboard
  const copylink = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target;
    if (inputElement.files && inputElement.files.length > 0) {
      if (inputElement.files[0].size > 10000000) {
        // alert("File size is too big must be less than 10mb");
        console.log("first toast");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
      setUploadFile(inputElement.files[0]);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    console.log("upload file: ", uploadFile);

    fetch(`${backend_url}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShortUrl(data.shortUrl);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="w-full flex items-center justify-center h-screen flex-col gap-10">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {/* <Label htmlFor="picture">Upload Picture, Video or PDF </Label>
        <Input id="picture" type="file" onChange={handleFileChange} /> */}

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, GIF, PDF, MP4, MP3 OR MKV (MAX. 10mb)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <Button onClick={handleUpload}>Upload File</Button>
      </div>
      {shortUrl && (
        <div className="flex gap-5 items-center justify-between">
          <Input disabled value="file-shorten-url" />
          <Button onClick={copylink}>Copy</Button>
        </div>
      )}
    </div>
  );
}
