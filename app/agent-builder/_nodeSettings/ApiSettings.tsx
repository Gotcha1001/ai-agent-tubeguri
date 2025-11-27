// "use client";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";

// function ApiSettings({ selectedNode, updateFormData }: any) {
//   const [formData, setFormData] = useState({
//     name: "",
//     method: "GET",
//     url: "",
//     apiKey: "",
//     includeApiKey: true,
//     bodyParams: "",
//   });

//   useEffect(() => {
//     selectedNode && setFormData(selectedNode?.data.settings);
//   }, [selectedNode]);

//   const handleChange = (key: string, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const onSave = () => {
//     console.log("FORM:", formData);
//     updateFormData(formData);
//     toast.success("API Agent Settings Updated");
//   };

//   return (
//     <div>
//       <h2 className="font-bold">API Agent</h2>
//       <p className="text-gray-500 mt-2">Call an external API</p>
//     </div>
//   );
// }

// export default ApiSettings;

"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function ApiSettings({ selectedNode, updateFormData }: any) {
  const [formData, setFormData] = useState({
    name: "",
    method: "GET",
    url: "",
    apiKey: "",
    includeApiKey: false,
    bodyParams: "",
  });

  useEffect(() => {
    console.log("Selected Node:", selectedNode);
    console.log("Settings from node:", selectedNode?.data?.settings);

    if (selectedNode?.data?.settings) {
      setFormData(selectedNode.data.settings);
    } else if (selectedNode?.data?.label) {
      // Initialize with default values if no settings exist yet
      setFormData({
        name: selectedNode.data.label,
        method: "GET",
        url: "",
        apiKey: "",
        includeApiKey: false,
        bodyParams: "",
      });
    }
  }, [selectedNode]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    if (!formData.name) {
      toast.error("Please enter a name for the API agent");
      return;
    }
    console.log("FORM:", formData);
    updateFormData(formData);
    toast.success("API Agent Settings Updated");
  };

  return (
    <div>
      <h2 className="font-bold">API Agent</h2>
      <p className="text-gray-500 mt-2">
        Call an external API endpoint with your chosen method
      </p>

      {/* Name Field */}
      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input
          value={formData?.name}
          placeholder="API Agent Name"
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </div>

      {/* Request Method */}
      <div className="mt-3 space-y-1">
        <Label>Request Method</Label>
        <Select
          value={formData?.method}
          onValueChange={(value) => handleChange("method", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* API URL */}
      <div className="mt-3 space-y-1">
        <Label>API URL</Label>
        <Input
          value={formData?.url}
          placeholder="https://api.example.com/data"
          onChange={(event) => handleChange("url", event.target.value)}
        />
      </div>

      {/* Include API Key Toggle */}
      <div className="mt-3 flex justify-between items-center">
        <Label>Include API Key</Label>
        <Switch
          checked={formData?.includeApiKey}
          onCheckedChange={(checked) => handleChange("includeApiKey", checked)}
        />
      </div>

      {/* API Key Field (conditional) */}
      {formData?.includeApiKey && (
        <div className="mt-3 space-y-1">
          <Label>API Key</Label>
          <Input
            type="password"
            value={formData?.apiKey}
            placeholder="Enter your API key"
            onChange={(event) => handleChange("apiKey", event.target.value)}
          />
        </div>
      )}

      {/* Body Parameters (for POST/PUT/PATCH) */}
      {(formData?.method === "POST" ||
        formData?.method === "PUT" ||
        formData?.method === "PATCH") && (
        <div className="mt-3 space-y-1">
          <Label>Body Parameters (JSON)</Label>
          <Textarea
            value={formData?.bodyParams}
            placeholder='{"key": "value"}'
            onChange={(event) => handleChange("bodyParams", event.target.value)}
          />
        </div>
      )}

      {/* Save Button */}
      <Button onClick={onSave} className="w-full mt-5">
        Save
      </Button>
    </div>
  );
}

export default ApiSettings;
