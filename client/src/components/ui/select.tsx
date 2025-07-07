"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  placeholder?: string;
  showChevron?: boolean;
}

const CustomSelect = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, children, placeholder, showChevron = true, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [selectedLabel, setSelectedLabel] = React.useState<string>("");
    
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const handleSelect = (value: string, label: string) => {
      setSelectedValue(value);
      setSelectedLabel(label);
      setIsOpen(false);
      
      if (props.onChange) {
        const event = {
          target: { value },
          currentTarget: { value }
        } as React.ChangeEvent<HTMLSelectElement>;
        props.onChange(event);
      }
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const options = React.useMemo(() => {
      const optionsArray: { value: string; children: string }[] = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === "option") {
          optionsArray.push({
            value: child.props.value as string,
            children: child.props.children as string
          });
        }
      });
      return optionsArray;
    }, [children]);

    React.useEffect(() => {
      if (options.length > 0) {
        const selectedOption = options.find(opt => opt.value === props.value) || (placeholder ? null : options[0]);
        
        if (selectedOption) {
          setSelectedValue(selectedOption.value);
          setSelectedLabel(selectedOption.children);
        } else if (placeholder) {
          setSelectedValue("");
          setSelectedLabel("");
        }
      }
    }, [options, props.value, placeholder]);

    return (
      <div 
        className="relative w-full"
        ref={dropdownRef}
      >
        <motion.div
          style={{
            background: useMotionTemplate` radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px, #3b82f6,
              transparent 80%
            )`,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="group/input rounded-lg p-[2px] transition duration-300"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={cn(
              `flex h-10 w-full cursor-pointer items-center justify-between rounded-md border-none bg-gray-50 px-3 py-2 text-sm shadow-input transition-all duration-400 group-hover/input:shadow-none 
              focus:outline-none dark:bg-zinc-800 dark:shadow-[0px_0px_1px_1px_#404040]`,
              {
                "text-gray-400": !selectedValue,
                "text-black dark:text-white": selectedValue
              },
              className
            )}
          >
            <span className="truncate">
              {selectedValue ? selectedLabel : (placeholder || "请选择")}
            </span>
            {showChevron && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transform transition-transform duration-300 text-gray-400",
                  isOpen ? "rotate-180" : "rotate-0"
                )} 
              />
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="max-h-60 overflow-auto overscroll-contain py-1">
                {placeholder && (
                  <li
                    className={cn(
                      "px-4 py-2 text-sm text-gray-400",
                      "cursor-default"
                    )}
                  >
                    {placeholder}
                  </li>
                )}
                
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value, option.children)}
                    className={cn(
                      "cursor-pointer px-4 py-2 text-sm transition-colors duration-200",
                      "hover:bg-gray-100 dark:hover:bg-zinc-700",
                      selectedValue === option.value
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {option.children}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        
        <select
          className="hidden"
          value={selectedValue}
          onChange={() => {}}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
export { CustomSelect as Select };