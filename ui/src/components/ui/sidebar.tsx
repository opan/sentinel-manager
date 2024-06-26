import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function Sidebar() {
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
      >
        <ResizablePanel>
          Sidebar panel
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  )
}

// export function Sidebar() {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold p-5">Sentinel Manager</h2>
//       <ScrollArea className="border">
//         <div className="">
//           <Button asChild className="justify-start w-full text-lg" variant="ghost">
//             <Link href="/" className="">Dashboard</Link>
//           </Button>

//           <Button asChild className="justify-start w-full text-lg" variant="ghost">
//             <Link href="/">Setting</Link>
//           </Button>
//         </div>
//       </ScrollArea>
//     </div>
//   )
// }