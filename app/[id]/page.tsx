"use client";
import { Button } from "@/components/ui/button";
import { backend_url } from "@/helper";
import Image from "next/image";
import { useEffect } from "react";

const File: React.FC<{ params: { id: string } }> = ({ params }) => {
  useEffect(() => {
    const fetchFile = async () => {
      const res = await fetch(`${backend_url}/file/${params.id}`);
      console.log("🔥  file: page.tsx:12  res: ", res);
      const data = await res.json();
      console.log("🥶🥶  file: page.tsx:13  data: ", data);
    };
    fetchFile();
  }, []);

  const handleDownload = async () => {
    try {
      await fetch(`${backend_url}/download/${params.id}`);
    } catch (err) {
      console.log("🥶🥶  file: page.tsx:22  err: ", err);
    }
  };

  return (
    <div>
      <Button className="absolute right-0 top-0 m-5" onClick={handleDownload}>
        {" "}
        Download{" "}
      </Button>
      <div className="flex flex-col w-full justify-center items-center mt-20">
        <div className="font-semibold text-2xl"> Preview </div>
        <div className="w-[80%] p-10 ">
          <Image
            width={1000}
            height={1000}
            src="https://images.unsplash.com/photo-1658233427270-ba4d9d03b53c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            alt="file-preview"
          />
        </div>
      </div>
    </div>
  );
};

export default File;
