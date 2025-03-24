
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Copy, Eye, EyeOff, Key, Plus, RefreshCw, Shield, Trash2, Upload } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";

const apiKeys = [
  { id: "key_1", name: "Production API Key", key: "sk_prod_2eF9dKlGh56jKlMn7zX8vB4c5D6eF7gH", createdAt: "2023-06-15T10:30:00Z", lastUsed: "2023-08-20T14:45:20Z" },
  { id: "key_2", name: "Development API Key", key: "sk_dev_8gF7dHeL56mKnJ9pQ1rS2tU3vW4xY5zZ", createdAt: "2023-07-22T08:15:30Z", lastUsed: "2023-08-19T11:20:10Z" },
  { id: "key_3", name: "Testing API Key", key: "sk_test_3jK4lMnO5pQrS6tUvW7xYzA1bC2dE3fG", createdAt: "2023-08-05T16:40:00Z", lastUsed: "2023-08-18T09:10:45Z" },
];

const knowledgeBase = [
  { id: "kb_1", name: "Product Documentation", size: "2.4 MB", format: "PDF", status: "processed", uploadDate: "2023-07-10T09:20:30Z" },
  { id: "kb_2", name: "Customer FAQ", size: "1.1 MB", format: "DOCX", status: "processing", uploadDate: "2023-08-18T14:30:10Z" },
  { id: "kb_3", name: "Technical Specifications", size: "5.7 MB", format: "PDF", status: "processed", uploadDate: "2023-08-15T11:45:20Z" },
  { id: "kb_4", name: "User Manuals", size: "8.2 MB", format: "PDF", status: "error", uploadDate: "2023-08-17T16:15:40Z" },
];

const Dashboard = () => {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [selectedTab, setSelectedTab] = useState("overview");

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const handleDeleteKey = (keyId: string) => {
    // This would be where you'd call your API to delete the key
    console.log(`Delete key ${keyId}`);
    toast.success("API key has been deleted");
  };

  const handleUploadFile = () => {
    // This would handle the file upload
    console.log("File would be uploaded here");
    toast.success("File uploaded successfully");
  };

  const handleCreateApiKey = () => {
    // This would create a new API key
    console.log("New API key would be created here");
    toast.success("New API key has been created");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-500">Processed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,345</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active API Keys
                  </CardTitle>
                  <Key className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +1 created this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Knowledge Base Files</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">
                    17.4 MB total size
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent API Calls</CardTitle>
                  <CardDescription>Your recent API activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">GET /api/v1/chat/completions</p>
                        <p className="text-sm text-muted-foreground">Today at 2:34 PM</p>
                      </div>
                      <div className="ml-auto font-medium">200 OK</div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">POST /api/v1/embeddings</p>
                        <p className="text-sm text-muted-foreground">Today at 1:15 PM</p>
                      </div>
                      <div className="ml-auto font-medium">200 OK</div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">GET /api/v1/models</p>
                        <p className="text-sm text-muted-foreground">Today at 11:42 AM</p>
                      </div>
                      <div className="ml-auto font-medium">200 OK</div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">POST /api/v1/chat/completions</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 4:30 PM</p>
                      </div>
                      <div className="ml-auto font-medium">200 OK</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                  <CardDescription>Your API usage for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 mr-2" />
                          <span>Chat Completions</span>
                        </div>
                        <span>1,245 / 5,000</span>
                      </div>
                      <Progress value={25} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          <span>Embeddings</span>
                        </div>
                        <span>890 / 10,000</span>
                      </div>
                      <Progress value={9} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 mr-2" />
                          <span>Knowledge Base Queries</span>
                        </div>
                        <span>210 / 1,000</span>
                      </div>
                      <Progress value={21} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="api-keys" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        Create a new API key to authenticate your API requests.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="key-name" className="text-right">
                          Key Name
                        </Label>
                        <Input
                          id="key-name"
                          placeholder="e.g. Production API Key"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateApiKey}>Create Key</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{apiKey.name}</h3>
                            <div className="mt-1 flex items-center">
                              <div className="text-sm text-muted-foreground font-mono flex items-center max-w-[300px] overflow-hidden">
                                {showKey[apiKey.id] ? (
                                  apiKey.key
                                ) : (
                                  `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}`
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => toggleKeyVisibility(apiKey.id)}
                                className="ml-2"
                              >
                                {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => copyApiKey(apiKey.key)}
                                className="ml-2"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Created: {formatDate(apiKey.createdAt)} • Last used: {formatDate(apiKey.lastUsed)}
                            </div>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDeleteKey(apiKey.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="knowledge-base" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>Train your AI on your own data</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Files
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Knowledge Base Files</DialogTitle>
                      <DialogDescription>
                        Upload documents to train your AI model.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="file-upload">Select files</Label>
                        <Input id="file-upload" type="file" multiple />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUploadFile}>Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {knowledgeBase.map((file) => (
                      <div key={file.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <div className="mt-1 flex items-center">
                              <Badge variant="outline">{file.format}</Badge>
                              <span className="ml-2 text-xs text-muted-foreground">{file.size}</span>
                              <div className="ml-2">
                                {getStatusBadge(file.status)}
                              </div>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Uploaded: {formatDate(file.uploadDate)}
                            </div>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
