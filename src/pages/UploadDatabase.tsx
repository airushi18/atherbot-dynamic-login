
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UploadDatabase = () => {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('success');
      toast({
        title: "Upload successful",
        description: "Your database has been uploaded and processed successfully",
      });
    } catch (error) {
      clearInterval(interval);
      setUploadStatus('error');
      toast({
        title: "Upload failed",
        description: "There was an error uploading your database",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-atherbot-dark mb-2">Upload Database</h1>
        <p className="text-atherbot-gray">Upload your database file to train the AI chatbot</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Database File</CardTitle>
            <CardDescription>
              Upload your database or knowledge base to train the AI chatbot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() => document.getElementById('file-upload')?.click()}>
                <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-atherbot-blue">Click to upload</span> or drag and drop
                  </Label>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".csv,.xlsx,.json,.txt,.pdf" 
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: CSV, XLSX, JSON, TXT, PDF (Max 50MB)
                </p>
              </div>

              {file && (
                <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 bg-atherbot-blue/10 p-2 rounded">
                      <UploadCloud className="h-5 w-5 text-atherbot-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  {uploadStatus === 'success' ? (
                    <div className="flex items-center text-green-500">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="text-sm">Uploaded</span>
                    </div>
                  ) : uploadStatus === 'error' ? (
                    <div className="flex items-center text-red-500">
                      <AlertCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm">Failed</span>
                    </div>
                  ) : null}
                </div>
              )}

              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-atherbot-blue h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
                <p className="font-medium mb-1">Important notes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Make sure your data is structured properly</li>
                  <li>Remove any sensitive or personal information</li>
                  <li>Larger databases may take longer to process</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? 'Uploading...' : 'Upload Database'}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Guidelines</CardTitle>
            <CardDescription>
              Follow these guidelines for the best results with your AI chatbot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Recommended Format</h3>
                <p className="text-sm text-gray-600">
                  For best results, structure your database with clear questions and answers or organize content with descriptive titles and detailed information.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Data Preparation</h3>
                <p className="text-sm text-gray-600">
                  Clean your data before uploading. Remove duplicate entries, fix formatting issues, and ensure consistency in your data structure.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">File Size Considerations</h3>
                <p className="text-sm text-gray-600">
                  Larger databases provide more knowledge but take longer to process. Start with a focused dataset for quicker results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadDatabase;
