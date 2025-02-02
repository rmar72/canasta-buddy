import { Button } from "@/components/shadcn-ui-components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui-components/dropdown-menu"
import { AiTwotoneEdit } from "react-icons/ai";
import { AiTwotoneSetting } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiTwotoneFolder } from "react-icons/ai";

export default function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <AiTwotoneSetting />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Canasta Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Edit Canasta
            <DropdownMenuShortcut>
              <AiTwotoneEdit size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Archive Canasta
            <DropdownMenuShortcut>
              <AiTwotoneFolder size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Delete Canasta
            <DropdownMenuShortcut>
              <AiTwotoneDelete size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}