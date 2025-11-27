"use client";
import MotionWrapperDelay from "@/app/components/FramerMotion/MotionWrapperDelay";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useAuth } from "@clerk/nextjs";

function CreateAgentSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const CreateAgentMutation = useMutation(api.agent.CreateAgent);
  const [agentName, setAgentName] = useState<string>();
  const [loader, setLoader] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { has } = useAuth();
  const isPaidUser = has && has({ plan: "unlimited_plan" });

  const router = useRouter();

  const CreateAgent = async () => {
    if (!isPaidUser && userDetail && userDetail.remainingCredits <= 0) {
      toast.error(
        "You have reached the limit of free agents. Please upgrade your plan to continue creating"
      );
      return;
    }

    setLoader(true);
    const agentId = uuidv4();
    const result = await CreateAgentMutation({
      agentId: agentId,
      name: agentName ?? "",
      userId: userDetail?._id,
    });
    console.log("RESULT:", result);
    setOpenDialog(false);
    setLoader(false);
    toast.success("Creating Agent");
    //Navigate to Agent Builder Screen
    router.push("/agent-builder/" + agentId);
  };

  return (
    <div className="space-y-2 flex flex-col justify-center items-center mt-24">
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <h2 className="gradient-title font-bold text-3xl">Create AI Agent</h2>
      </MotionWrapperDelay>
      <p className="text-lg">
        Build a AI Agent workflow with custom logic and tools
      </p>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenDialog(true)}
            size={"lg"}
            variant={"sex3"}
          >
            <Plus /> Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Agent Name</DialogTitle>
            <DialogDescription>
              <Input
                onChange={(event) => setAgentName(event.target.value)}
                placeholder="Agent Name"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>

            <Button
              disabled={loader}
              onClick={() => CreateAgent()}
              variant={"sex3"}
            >
              {loader && <Loader2Icon className="animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateAgentSection;
// "use client";

// import MotionWrapperDelay from "@/app/components/FramerMotion/MotionWrapperDelay";
// import { Button } from "@/components/ui/button";
// import { Loader2Icon, Plus } from "lucide-react";
// import React, { useContext, useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { v4 as uuidv4 } from "uuid";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { UserDetailContext } from "@/context/UserDetailContext";

// function CreateAgentSection() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const CreateAgentMutation = useMutation(api.agent.CreateAgent);
//   const [agentName, setAgentName] = useState<string>();
//   const [loader, setLoader] = useState(false);
//   const { userDetail } = useContext(UserDetailContext);
//   const router = useRouter();

//   const CreateAgent = async () => {
//     // ✅ Add validation check
//     if (!userDetail?._id) {
//       toast.error("User details not loaded. Please try again.");
//       return;
//     }

//     setLoader(true);
//     try {
//       const agentId = uuidv4();
//       const result = await CreateAgentMutation({
//         agentId: agentId,
//         name: agentName ?? "",
//         userId: userDetail._id, // ✅ Now safely passing userId
//       });

//       console.log("RESULT:", result);
//       setOpenDialog(false);
//       toast.success("Agent created successfully!");

//       // Navigate to Agent Builder Screen
//       router.push("/agent-builder/" + agentId);
//     } catch (error) {
//       console.error("Error creating agent:", error);
//       toast.error("Failed to create agent. Please try again.");
//     } finally {
//       setLoader(false);
//     }
//   };

//   return (
//     <div className="space-y-2 flex flex-col justify-center items-center mt-24">
//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         variants={{
//           hidden: { opacity: 0, y: -100 },
//           visible: { opacity: 1, y: 0 },
//         }}
//       >
//         <h2 className="gradient-title font-bold text-3xl">Create AI Agent</h2>
//       </MotionWrapperDelay>
//       <p className="text-lg">
//         Build a AI Agent workflow with custom logic and tools
//       </p>
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogTrigger asChild>
//           <Button
//             onClick={() => setOpenDialog(true)}
//             size={"lg"}
//             variant={"sex3"}
//             disabled={!userDetail} // ✅ Disable button if user not loaded
//           >
//             <Plus /> Create
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Enter Agent Name</DialogTitle>
//             <DialogDescription>
//               <Input
//                 onChange={(event) => setAgentName(event.target.value)}
//                 placeholder="Agent Name"
//               />
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant={"ghost"}>Cancel</Button>
//             </DialogClose>
//             <Button
//               disabled={loader || !agentName?.trim()}
//               onClick={() => CreateAgent()}
//               variant={"sex3"}
//             >
//               {loader && <Loader2Icon className="animate-spin" />}
//               Create
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default CreateAgentSection;
