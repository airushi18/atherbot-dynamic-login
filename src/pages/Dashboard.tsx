
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Key, FileText } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
  // Dummy data
  const apiKeys = [
    { id: 1, name: 'Production Key', key: 'ather_prod_1234567890', createdAt: '2023-05-15' },
    { id: 2, name: 'Development Key', key: 'ather_dev_0987654321', createdAt: '2023-06-01' },
  ];
  
  const knowledgeFiles = [
    { id: 1, name: 'Product Documentation.pdf', size: '2.4 MB', uploadedAt: '2023-05-20' },
    { id: 2, name: 'FAQ Database.json', size: '1.8 MB', uploadedAt: '2023-06-05' },
    { id: 3, name: 'Customer Queries.csv', size: '3.2 MB', uploadedAt: '2023-06-15' },
  ];
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-atherbot-dark mb-2">Dashboard</h1>
        <p className="text-atherbot-gray">Welcome to your Ather Bot dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* API Keys Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Your generated API keys for integration
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1">
              <Key className="h-4 w-4" />
              <span>Manage Keys</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <div className="font-medium text-atherbot-dark">{item.name}</div>
                    <div className="text-sm text-atherbot-gray">Created on {item.createdAt}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-atherbot-blue/10 text-atherbot-blue text-xs rounded-full font-medium">
                      {item.key.substring(0, 10)}...
                    </div>
                    <Button variant="ghost" size="icon" title="Copy Key">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button className="w-full gap-1">
                <Plus className="h-4 w-4" />
                <span>Generate New API Key</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Knowledge Base Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Your uploaded files for AI training
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1">
              <FileText className="h-4 w-4" />
              <span>View All</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgeFiles.map((file) => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-atherbot-blue/10 flex items-center justify-center text-atherbot-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-atherbot-dark">{file.name}</div>
                      <div className="text-sm text-atherbot-gray">{file.size} • Uploaded on {file.uploadedAt}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" title="Remove File">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              ))}
              
              <Button className="w-full gap-1">
                <Upload className="h-4 w-4" />
                <span>Upload New File</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-atherbot-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-atherbot-blue/10 flex items-center justify-center text-atherbot-blue">
              <Key className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-medium">Generate API Key</div>
              <div className="text-sm text-atherbot-gray">Create new API credentials</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Upload className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-medium">Upload Data</div>
              <div className="text-sm text-atherbot-gray">Add files to knowledge base</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-medium">Read Docs</div>
              <div className="text-sm text-atherbot-gray">Learn API integration</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Settings className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-medium">Setup Profile</div>
              <div className="text-sm text-atherbot-gray">Update account settings</div>
            </div>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
