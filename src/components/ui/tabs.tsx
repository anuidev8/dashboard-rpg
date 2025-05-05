"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative inline-flex h-12 items-center justify-center rounded-md bg-stone-900/80 p-1 border-2 border-amber-700/30 shadow-[0_0_10px_rgba(218,165,32,0.1)]",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-t-[.7rem]  px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-amber-300/70 hover:text-amber-200",
      "data-[state=active]:bg-gradient-to-b data-[state=active]:from-amber-700/50 data-[state=active]:to-amber-600/50 data-[state=active]:text-amber-100 data-[state=active]:shadow-[0_0_8px_rgba(218,165,32,0.3)]",
      "data-[state=active]:border data-[state=active]:border-amber-500/30",
      "overflow-hidden",
      className,
    )}
    {...props}
  >
    <span className="relative z-10">{props.children}</span>
    <span className="absolute inset-0 data-[state=active]:bg-gradient-to-b data-[state=active]:from-amber-700/50 data-[state=active]:to-amber-600/50 opacity-0 data-[state=active]:opacity-100 transition-opacity"></span>
    <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 data-[state=active]:opacity-100"></span>
    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 data-[state=active]:opacity-100"></span>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2",
      "rounded-md border-2 border-amber-700/30 bg-stone-900/60 p-2 shadow-[0_0_15px_rgba(218,165,32,0.1)]",
      "relative overflow-hidden",
      className,
    )}
    {...props}
  >
    {/* Decorative corners */}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500/50"></div>
    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500/50"></div>
    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500/50"></div>
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500/50"></div>

    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-amber-500/5"></div>

    {/* Content */}
    <div className="relative z-10 h-full">{props.children}</div>
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
