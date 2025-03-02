"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, use } from "react";
import ImageUploadForm from "@/components/image-upload-form";
import MyImages from "@/components/myimages";


export default function ProfilePage({ params }) {
  const { isLoaded } = useAuth();
  const { user } = useUser();

  // Unwrap params using `use()` hook
  const resolvedParams = use(params);
  const username = decodeURIComponent(resolvedParams.username).replace(/^@/, "");  

  const [isUploading, setIsUploading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 lg:px-16 xl:px-20 py-8">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      {user && (
        <p className="text-accent-foreground">
          Welcome back, <strong>{user.firstName || user.username}!</strong>
        </p>
      )}

      <p className="text-xs text-muted-foreground">@{username}</p>

      <Tabs defaultValue="images" className="mt-6">
        <TabsList>
          <TabsTrigger value="images">My Images</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <MyImages username={username} />
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardContent className="pt-6">
              <ImageUploadForm
                username={username}
                setIsUploading={setIsUploading}
                isUploading={isUploading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
