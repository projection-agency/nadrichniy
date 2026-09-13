"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useThemeSettings } from "@/lib/useThemeSettings";
import { getSiteLogoUrl } from "@/lib/themeSettings";

type SiteLogoProps = {
  className?: string;
  skeletonClassName?: string;
  mode?: "header" | "footer";
  width?: number;
  height?: number;
  onReady?: () => void;
};

function LogoImage({
  src,
  className,
  width,
  height,
  priority,
  onReady,
}: {
  src: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  onReady?: () => void;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isRemote = /^https?:\/\//i.test(src);
  const imgStyle = {
    width: "auto",
    height: "100%",
    maxHeight: "100%",
    objectFit: "contain" as const,
  };

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) {
      onReady?.();
    }
  }, [src, onReady]);

  if (isRemote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef}
        className={className}
        src={src}
        alt="Надрічний"
        width={width}
        height={height}
        style={imgStyle}
        onLoad={onReady}
        onError={onReady}
      />
    );
  }

  return (
    <Image
      className={className}
      src={src}
      alt="Надрічний"
      width={width}
      height={height}
      priority={priority}
      style={imgStyle}
      onLoad={onReady}
      onError={onReady}
    />
  );
}

const SiteLogo = ({
  className,
  skeletonClassName,
  mode = "header",
  width = 202,
  height = 48,
  onReady,
}: SiteLogoProps) => {
  const { settings, loading } = useThemeSettings();
  const logoUrl = getSiteLogoUrl(settings);

  useEffect(() => {
    if (!loading && !logoUrl) {
      onReady?.();
    }
  }, [loading, logoUrl, onReady]);

  if (loading || !logoUrl) {
    return <span className={skeletonClassName || className} aria-hidden />;
  }

  return (
    <LogoImage
      className={className}
      src={logoUrl}
      width={width}
      height={height}
      priority={mode === "header"}
      onReady={onReady}
    />
  );
};

export default SiteLogo;
