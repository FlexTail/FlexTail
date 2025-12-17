"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  Button,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  CopyIcon,
} from "../components/ui/Button";

const RAW_COMPONENT_CODE = `"use client";

import React, { forwardRef, useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5" /></svg>
);

const CautionIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);

const COLOR_MAP = {
  slate: "#475569", gray: "#4b5563", zinc: "#52525b", neutral: "#52525b", stone: "#57534e",
  red: "#dc2626", orange: "#ea580c", amber: "#d97706", yellow: "#ca8a04", lime: "#65a30d",
  green: "#16a34a", emerald: "#059669", teal: "#0d9488", cyan: "#0891b2", sky: "#0284c7",
  blue: "#2563eb", indigo: "#4f46e5", violet: "#7c3aed", purple: "#9333ea", fuchsia: "#c026d3",
  pink: "#db2777", rose: "#e11d48",
};

const getContrastYIQ = (hexcolor) => {
  try {
    const hex = hexcolor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  } catch (e) { return "white"; }
};

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white dark:ring-offset-slate-950",
  {
    variants: {
      variant: {
        primary: "border hover:brightness-110 shadow-sm",
        secondary: "border opacity-90 hover:opacity-100 shadow-sm",
        tertiary: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
        outline: "bg-transparent border-2 hover:bg-slate-50 dark:hover:bg-slate-900",
        ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 p-0 h-auto",
        grayscale: "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 border-transparent",
        binary: "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 border-transparent shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      groupPos: {
        none: "rounded-md",
        left: "rounded-l-md rounded-r-none border-r-0",
        right: "rounded-r-md rounded-l-none border-l-0",
        top: "rounded-t-md rounded-b-none border-b-0",
        bottom: "rounded-b-md rounded-t-none border-t-0",
        middle: "rounded-none border-x-0",
      },
      iconPos: {
        left: "flex-row",
        right: "flex-row-reverse",
        top: "flex-col",
        bottom: "flex-col-reverse",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      groupPos: "none",
      iconPos: "left",
    },
  }
);

export const Button = forwardRef((props, ref) => {
    const {
      className,
      variant = "primary",
      size,
      twColor = "blue",
      customColor,
      rounded,
      groupPos,
      icon,
      iconPos,
      iconSize,
      children,
      preset,
      buttonType,
      style,
      ...rest
    } = props;

    const effectivePreset = preset || buttonType;

    const resolvedPreset = useMemo(() => {
      if (effectivePreset === "submit") return { icon: <CheckIcon />, label: "Submit", color: "green", variant: "primary" };
      if (effectivePreset === "cancel") return { icon: <CautionIcon />, label: "Cancel", color: "gray", variant: "grayscale" };
      return null;
    }, [effectivePreset]);

    const effectiveVariant = resolvedPreset?.variant || variant;
    const effectiveColorName = resolvedPreset?.color || twColor;
    const effectiveIcon = resolvedPreset?.icon || icon;
    const effectiveLabel = resolvedPreset?.label || children;

    const dynamicStyles = useMemo(() => {
      if (["grayscale", "binary", "link"].includes(effectiveVariant)) {
        return { style: { borderRadius: rounded, ...style }, className: "" };
      }

      const hexColor = customColor || COLOR_MAP[effectiveColorName] || effectiveColorName;
      const contrastColor = getContrastYIQ(hexColor);

      const baseStyle = {
        "--btn-bg": hexColor,
        "--btn-text": contrastColor,
        borderRadius: rounded,
        ...style,
      };

      let variantClasses = "";
      switch (effectiveVariant) {
        case "primary": variantClasses = "bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-bg)] focus-visible:ring-[var(--btn-bg)]"; break;
        case "secondary": variantClasses = "bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-bg)] focus-visible:ring-[var(--btn-bg)] opacity-80"; break;
        case "tertiary": variantClasses = "text-[var(--btn-bg)] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] hover:bg-opacity-10"; break;
        case "outline": variantClasses = "border-[var(--btn-bg)] text-[var(--btn-bg)] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)]"; break;
        case "ghost": variantClasses = "text-[var(--btn-bg)] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] hover:bg-opacity-10"; break;
      }
      return { style: baseStyle, className: variantClasses };
    }, [effectiveVariant, effectiveColorName, customColor, rounded, style]);

    const computedClass = twMerge(clsx(buttonVariants({ variant: effectiveVariant, size, groupPos: rounded ? "none" : groupPos, iconPos }), dynamicStyles.className, className));

    const content = (
      <>
        {effectiveIcon && (
          <span className={clsx("flex items-center justify-center", effectiveLabel ? (iconPos === "right" || iconPos === "bottom" ? "ml-2" : "mr-2") : "")} style={{ width: iconSize, height: iconSize }}>
            {effectiveIcon}
          </span>
        )}
        {effectiveLabel}
      </>
    );

    if (props.href) {
      return <a ref={ref} className={computedClass} style={dynamicStyles.style} {...rest}>{content}</a>;
    }

    return <button ref={ref} type={props.type || "button"} className={computedClass} style={dynamicStyles.style} {...rest}>{content}</button>;
});
Button.displayName = "Button";
`;

export default function ButtonDemoPage() {
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variants = [
    "primary",
    "secondary",
    "tertiary",
    "outline",
    "ghost",
    "link",
    "grayscale",
    "binary",
  ] as const;

  const colors = ["blue", "red", "green", "purple", "orange", "teal"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <StarIcon className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              FlexTail Button
            </h1>
          </div>
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("preview")}
              className={clsx(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                activeTab === "preview"
                  ? "bg-white dark:bg-slate-700 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={clsx(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                activeTab === "code"
                  ? "bg-white dark:bg-slate-700 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Docs & Code
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "preview" ? (
          <div className="space-y-16">
            <section>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Variants</h3>
                <p className="text-slate-500">
                  8 distinct visual styles for every context.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
                {variants.map((v) => (
                  <Button key={v} variant={v} twColor="indigo">
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Color Intelligence</h3>
                <p className="text-slate-500">
                  The component automatically calculates the best text contrast
                  (black or white) based on the background luminance. It accepts
                  Tailwind color names or raw Hex codes.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-wrap gap-4">
                  {colors.map((c) => (
                    <Button key={c} twColor={c}>
                      {c}
                    </Button>
                  ))}
                  <Button twColor="lime">Lime (Auto Black Text)</Button>
                  <Button twColor="yellow">Yellow (Auto Black Text)</Button>
                </div>

                <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-slate-500 mr-4">
                    Custom Hex Values:
                  </span>
                  <Button customColor="#FF5733">#FF5733</Button>
                  <Button customColor="#33FF57" variant="outline">
                    #33FF57
                  </Button>
                  <Button customColor="#3357FF" variant="ghost">
                    #3357FF
                  </Button>
                  <Button customColor="#222222">#222</Button>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Sizes & Shapes</h3>
              </div>
              <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-8">
                <div className="flex flex-wrap items-end gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                  {sizes.map((s) => (
                    <Button key={s} size={s} twColor="violet">
                      Size {s.toUpperCase()}
                    </Button>
                  ))}
                  <Button size="icon" twColor="violet" aria-label="Icon Only">
                    <StarIcon />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button rounded="0px" twColor="pink">
                    Sharp (0px)
                  </Button>
                  <Button rounded="12px" twColor="pink">
                    Medium (12px)
                  </Button>
                  <Button rounded="9999px" twColor="pink">
                    Pill (Full)
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Icon Positioning</h3>
                <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 grid grid-cols-2 gap-4">
                  <Button icon={<ArrowRightIcon />} iconPos="left">
                    Left
                  </Button>
                  <Button
                    icon={<ArrowRightIcon />}
                    iconPos="right"
                    variant="outline"
                  >
                    Right
                  </Button>
                  <Button
                    icon={<ArrowRightIcon />}
                    iconPos="top"
                    variant="ghost"
                  >
                    Top
                  </Button>
                  <Button
                    icon={<ArrowRightIcon />}
                    iconPos="bottom"
                    variant="secondary"
                  >
                    Bottom
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Presets & States</h3>
                <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 grid grid-cols-2 gap-4">
                  <Button preset="submit" />
                  <Button preset="cancel" />
                  <Button disabled>Disabled</Button>
                  <Button href="#" variant="link">
                    As Anchor Link
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Button Groups</h3>
                <p className="text-slate-500">
                  Merge buttons seamlessly using the `groupPos` prop.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col items-center gap-6">
                <div className="flex">
                  <Button groupPos="left" twColor="blue">
                    Years
                  </Button>
                  <Button groupPos="middle" variant="outline" twColor="blue">
                    Months
                  </Button>
                  <Button groupPos="right" variant="outline" twColor="blue">
                    Days
                  </Button>
                </div>

                <div className="flex">
                  <Button groupPos="left" variant="binary" icon={<StarIcon />}>
                    Save
                  </Button>
                  <Button
                    groupPos="right"
                    variant="binary"
                    icon={<ArrowRightIcon />}
                  />
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-300">
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                Installation
              </h3>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900 rounded-lg p-6 flex justify-between items-center">
                  <code className="text-green-400 font-mono text-lg">
                    flextail add button
                  </code>
                  <button
                    onClick={() => handleCopy("flextail add button")}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Source Code
              </h3>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-lg">
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-mono text-slate-500">
                    components/ui/button.tsx
                  </span>
                  <button
                    onClick={() => handleCopy(RAW_COMPONENT_CODE)}
                    className="flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-slate-800 dark:text-slate-300 bg-slate-50 dark:bg-[#0B1120]">
                  {RAW_COMPONENT_CODE}
                </pre>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">Dependencies</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                    tailwind-merge
                  </code>{" "}
                  (For class conflict resolution)
                </li>
                <li>
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                    clsx
                  </code>{" "}
                  (For conditional class construction)
                </li>
                <li>
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                    class-variance-authority
                  </code>{" "}
                  (For variant management)
                </li>
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
