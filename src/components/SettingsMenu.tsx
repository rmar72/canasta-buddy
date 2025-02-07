import { Button } from "@/components/shadcn-ui-components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui-components/dropdown-menu";
import {
  AiTwotoneEdit,
  AiTwotoneSetting,
  AiTwotoneDelete,
  AiTwotoneFolder,
} from "react-icons/ai";

interface SettingsMenuProps {
  onEdit: () => void; // Define the type for the onEdit prop
}

export default function SettingsMenu({ onEdit }: SettingsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full sm:w-auto" variant="outline">
          <AiTwotoneSetting />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Canasta Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEdit}>
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
  );
}
