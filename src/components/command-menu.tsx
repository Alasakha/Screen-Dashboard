import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/context/SearchContext';
import {
  CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import { menuItems } from '@/config/menu-data.tsx';
import type { MenuItem } from '@/config/menu-data.tsx';
import { ExternalLink } from 'lucide-react';

export function CommandMenu() {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useSearch();

  const runCommand = React.useCallback((command: () => unknown) => {
    setIsOpen(false);
    command();
  }, [setIsOpen]);

  const renderCommandItem = (item: MenuItem) => {
    if (!item.isExternal) {
      return (
        <CommandItem
          key={item.path}
          value={`${item.title} ${item.path}`}
          onSelect={() => runCommand(() => navigate(item.path))}
        >
          {item.icon}
          <span className="ml-2">{item.title}</span>
        </CommandItem>
      );
    }
    
    return (
      <CommandItem
        key={item.path}
        value={`${item.title} ${item.path}`}
        onSelect={() => runCommand(() => window.open(item.path, '_blank'))}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>
      </CommandItem>
    );
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="输入命令或搜索..." />
      <CommandList>
        <CommandEmpty>没有找到结果。</CommandEmpty>
        {menuItems.map((group) => (
          <CommandGroup key={group.path} heading={group.title}>
            {!group.children && renderCommandItem(group)}
            
            {group.children?.map((item) => renderCommandItem(item))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
