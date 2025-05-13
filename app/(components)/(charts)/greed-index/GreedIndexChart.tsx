/**
 * GreedIndexChart Component
 * 
 * A customizable circular/semi-circular gauge chart commonly used for displaying
 * sentiment indices like Fear & Greed Index.
 * 
 * Features:
 * - Configurable rotation (top-half, right-half, etc.)
 * - Customizable colors, borders, and segment sizes
 * - Color-stop based segments (similar to CSS gradients)
 * - Adjustable thickness of the gauge arc
 * - Custom label styling (colors, font size, font weight)
 * - Optional needle indicator with customizable value
 * - Optional central value display
 * - Configurable borders (show/hide, active segment only)
 * - Customizable gaps between segments (size, color, thickness)
 * - Optional background track for incomplete gauges
 * - Responsive design that fits within its container
 * 
 * Props:
 * - titles: Labels for each segment
 * - percentages: Color stop positions (0-100) for each segment
 * - colors: Fill colors for segments
 * - borderColors: Border colors for segments
 * - borderWidth: Width of segment borders
 * - showBorders: Whether to display borders on segments
 * - showBorderOnActiveSegmentOnly: Whether to only show border on the active segment
 * - gapDegrees: Spacing between segments
 * - gapColor: Color for the gaps between segments
 * - gapThickness: Thickness of the gaps as a percentage of the main thickness (0-1)
 * - showBackgroundTrack: Whether to show a background track for incomplete gauges
 * - backgroundTrackColor: Color for the background track
 * - size: Base size of the chart
 * - showLabels: Whether to display segment labels
 * - needleValue: Current value (0-100) for needle position
 * - showNeedle: Whether to display the needle
 * - showValue: Whether to display the central value text
 * - rotation: Orientation of the gauge (0=right, 90=bottom, 180=left, 270=top)
 * - arcSpan: How many degrees the arc spans (default: 180)
 * - thickness: Width of the gauge as a percentage of radius
 * - labelColors: Text colors for segment labels
 * - labelFontSize: Font size for labels
 * - labelFontWeight: Font weight for labels
 * - valueFontSize: Font size for the central value
 * - valueFontWeight: Font weight for the central value
 * - valueColor: Color for the central value
 * - highlightActiveLabel: Whether to highlight the active segment label
 * - padding: Extra space around the chart for labels
 * - dashedElements: Array indicating which segments should have a dashed pattern
 * - dashWidth: Width of each dash
 * - dashGap: Gap between dashes
 * - showOuterSegments: Whether to show outer segments
 * - outerSegmentTitles: Titles for outer segments
 * - outerSegmentColors: Colors for outer segments
 * - outerSegmentActiveColors: Colors for active outer segments
 * - outerSegmentBorderColors: Border colors for outer segments
 * - outerSegmentThickness: Thickness of outer segments
 * - outerSegmentGap: Gap between outer segments
 * - outerSegmentOffset: Distance between main gauge and outer segments
 * - showOuterLabels: Whether to show labels on outer segments
 * - outerLabelColors: Colors for outer segment labels
 * - outerLabelFontSize: Font size for outer segment labels
 * - outerLabelFontWeight: Font weight for outer segment labels
 * - showOuterSegmentBorders: Whether to show borders on outer segments
 * - showOuterSegmentBorderOnActiveOnly: Whether to only show border on active outer segment
 * - outerActiveLabelFontWeight: Font weight for active outer segment label
 * - activeColors: Colors for active/hovered segments
 * - dashedElementActiveColors: Colors for active dashed elements
 * - needleColor: Color for the needle
 * - needleBaseColor: Color for the needle base/circle
 * - needleBaseSize: Size of the needle base circle
 * - needleWidth: Width/thickness of the needle
 * - needleLength: Length of the needle as a percentage of radius
 * - needleBaseBorderColor: Color for the border of the needle base
 * - needleBaseBorderWidth: Width of the border around the needle base
 * - animateNeedle: Whether to animate the needle movement
 * - animationDuration: Duration of the animation in milliseconds
 * - animationSteps: Number of steps in the animation (higher = smoother)
 * - showInnerArc: Whether to show the inner arc
 * - innerArcOffset: Distance from the main gauge (as a percentage of thickness)
 * - innerArcThickness: Thickness of inner arc (as a percentage of main thickness)
 * - innerArcStartColor: Start color for inner arc gradient
 * - innerArcEndColor: End color for inner arc gradient
 * - innerArcBorderColor: Border color for inner arc
 * - innerArcBorderWidth: Border width for inner arc
 * - innerArcSpan: How many degrees the inner arc spans (default: same as main arc)
 * - innerArcGradientAngle: Angle of the gradient in degrees
 * - innerArcHideBottomBorder: Whether to hide the bottom border of the inner arc
 * - showIndexLabels: Whether to show the index labels at the bottom
 * - leftIndexLabel: Text for the left index label
 * - rightIndexLabel: Text for the right index label
 * - indexLabelColor: Color for the index labels
 * - indexLabelFontSize: Font size for the index labels
 * - indexLabelFontWeight: Font weight for the index labels
 * - indexLabelOffsetY: Vertical offset for the index labels
 * - indexLabelOffsetX: Horizontal offset for the index labels (affects both labels)
 * - leftIndexLabelOffsetX: Additional horizontal offset for just the left label
 * - rightIndexLabelOffsetX: Additional horizontal offset for just the right label
 * - segmentSubtitles: Array of subtitles for each segment
 * - outerSegmentSubtitles: Array of subtitles for outer segments
 * - outerSubtitleFontSize: Font size for outer segment subtitles
 * - outerSubtitleFontWeight: Font weight for outer segment subtitles
 * - outerSubtitleOffset: Offset for subtitle positioning
 * - outerSubtitleColors: Custom colors for subtitles (defaults to black)
 * - outerLabelOffset: Offset for main title positioning
 * - showIndicator: Whether to show the separate indicator
 * - indicatorValue: Current value (0-100 percentage) for the separate indicator
 * - indicatorColor: Color for the separate indicator
 * - indicatorBaseWidth: Width of the base of the separate indicator
 * - indicatorLength: Length of the separate indicator
 * - indicatorOffset: Distance from inner radius
 * - indicatorTransitionDuration: Duration of transition in milliseconds
 * - indicatorSpringConfig: Spring configuration for the indicator
 */

'use client'
import React, { useState, useEffect, useRef } from 'react';
import GaugeTooltip from './GaugeTooltip';
import GaugeIndicator from './GaugeIndicator';

interface GreedIndexChartProps {
  setSelectedSegment: (index: number) => void;
  titles: string[];
  percentages: number[]; // Color stop positions (0-100) for each segment
  colors?: string[];
  borderColors?: string[];
  borderWidth?: number;
  showBorders?: boolean; // Whether to display borders on segments
  showBorderOnActiveSegmentOnly?: boolean; // Whether to only show border on the active segment
  gapDegrees?: number;
  gapColor?: string; // Color for the gaps between segments
  gapThickness?: number; // Thickness of the gaps as a percentage of the main thickness (0-1)
  showBackgroundTrack?: boolean; // Whether to show a background track for incomplete gauges
  backgroundTrackColor?: string; // Color for the background track
  size?: number;
  showLabels?: boolean;
  className?: string;
  needleValue?: number; // Value between 0-100 to position the needle
  showNeedle?: boolean;
  showValue?: boolean; // Whether to display the central value text
  rotation?: number; // Rotation in degrees (0 = right half, 270 = top half)
  arcSpan?: number; // How many degrees the arc spans (default: 180)
  thickness?: number; // Width of the gauge as a percentage of radius
  labelColors?: string[]; // Colors for each label
  labelFontSize?: number; // Font size for labels
  labelFontWeight?: string | number; // Font weight for labels
  valueFontSize?: number; // Font size for the central value
  valueFontWeight?: string | number; // Font weight for the central value
  valueColor?: string; // Color for the central value
  highlightActiveLabel?: boolean; // Whether to highlight the active label
  padding?: number; // Padding around the chart for labels
  dashedElements?: boolean[]; // Array indicating which segments should have a dashed pattern
  dashWidth?: number; // Width of each dash
  dashGap?: number; // Gap between dashes
  showOuterSegments?: boolean; // Whether to show outer segments
  outerSegmentTitles?: string[]; // Titles for outer segments
  outerSegmentColors?: string[]; // Colors for outer segments
  outerSegmentActiveColors?: string[]; // Colors for active outer segments
  outerSegmentBorderColors?: string[]; // Border colors for outer segments
  outerSegmentThickness?: number; // Thickness of outer segments
  outerSegmentGap?: number; // Gap between outer segments
  outerSegmentOffset?: number; // Distance between main gauge and outer segments
  showOuterLabels?: boolean; // Whether to show labels on outer segments
  outerLabelColors?: string[]; // Colors for outer segment labels
  outerLabelFontSize?: number; // Font size for outer segment labels
  outerLabelFontWeight?: string | number; // Font weight for outer segment labels
  showOuterSegmentBorders?: boolean; // Whether to show borders on outer segments
  showOuterSegmentBorderOnActiveOnly?: boolean; // Whether to only show border on active outer segment
  outerActiveLabelFontWeight?: string | number; // Font weight for active outer segment label
  activeColors?: string[]; // Colors for active/hovered segments
  dashedElementActiveColors?: string[]; // Colors for active dashed elements
  needleColor?: string; // Color for the needle
  needleBaseColor?: string; // Color for the needle base/circle
  needleBaseSize?: number; // Size of the needle base circle
  needleWidth?: number; // Width/thickness of the needle
  needleLength?: number; // Length of the needle as a percentage of radius
  needleBaseBorderColor?: string; // Color for the border of the needle base
  needleBaseBorderWidth?: number; // Width of the border around the needle base
  animateNeedle?: boolean; // Whether to animate the needle movement
  animationDuration?: number; // Duration of the animation in milliseconds
  animationSteps?: number; // Number of steps in the animation (higher = smoother)
  showInnerArc?: boolean; // Whether to show the inner arc
  innerArcOffset?: number; // Distance from the main gauge (as a percentage of thickness)
  innerArcThickness?: number; // Thickness of inner arc (as a percentage of main thickness)
  innerArcStartColor?: string; // Start color for inner arc gradient
  innerArcEndColor?: string; // End color for inner arc gradient
  innerArcBorderColor?: string; // Border color for inner arc
  innerArcBorderWidth?: number; // Border width for inner arc
  innerArcSpan?: number; // How many degrees the inner arc spans (default: same as main arc)
  innerArcGradientAngle?: number; // Angle of the gradient in degrees
  innerArcHideBottomBorder?: boolean; // Whether to hide the bottom border of the inner arc
  showIndexLabels?: boolean; // Whether to show the index labels at the bottom
  leftIndexLabel?: string; // Text for the left index label
  rightIndexLabel?: string; // Text for the right index label
  indexLabelColor?: string; // Color for the index labels
  indexLabelFontSize?: number; // Font size for the index labels
  indexLabelFontWeight?: number | string; // Font weight for the index labels
  indexLabelOffsetY?: number; // Vertical offset for the index labels
  indexLabelOffsetX?: number; // Horizontal offset for the index labels (affects both labels)
  leftIndexLabelOffsetX?: number; // Additional horizontal offset for just the left label
  rightIndexLabelOffsetX?: number; // Additional horizontal offset for just the right label
  segmentSubtitles?: string[]; // Array of subtitles for each segment
  outerSegmentSubtitles?: string[]; // Array of subtitles for outer segments
  outerSubtitleFontSize?: number; // Font size for outer segment subtitles
  outerSubtitleFontWeight?: string | number; // Font weight for outer segment subtitles
  outerSubtitleOffset?: number; // Offset for subtitle positioning
  outerSubtitleColors?: string[]; // Custom colors for subtitles (defaults to black)
  outerLabelOffset?: number; // Offset for main title positioning
  showIndicator?: boolean;
  indicatorValue?: number; // 0-100 percentage
  indicatorColor?: string;
  indicatorBaseWidth?: number;
  indicatorLength?: number;
  indicatorOffset?: number; // Distance from inner radius
  indicatorTransitionDuration?: number; // Duration of transition in milliseconds
  indicatorSpringConfig?: {
    tension?: number;    // Controls the "stiffness" (0-1)
    friction?: number;   // Controls the "bounciness" (0-1)
    precision?: number;  // Controls the precision of the animation
  };
}

// Interface for a segment with color stop information
interface Segment {
  title: string;
  subtitle?: string; // Add subtitle for tooltip
  startPercent: number;
  endPercent: number;
  color: string;
  activeColor?: string; // Color for active/hovered state
  borderColor: string;
  labelColor: string;
  isDashed?: boolean; // Whether this segment should have a dashed pattern
  dashedActiveColor?: string;
}

// Interface for arc information
interface ArcInfo {
  path: string;
  color: string;
  borderColor: string;
  labelColor: string;
  title: string;
  subtitle?: string; // Add subtitle for tooltip
  midAngle: number;
  isActive: boolean;
  isHovered: boolean;
  startPercent: number;
  endPercent: number;
  isDashed?: boolean; // Whether this segment should have a dashed pattern
  dashedActiveColor?: string;
  startAngle: number; // Added for dashed pattern calculation
  endAngle: number; // Added for dashed pattern calculation
  index: number; // Store the index for hover handling
}

// Interface for gap information
interface GapInfo {
  path: string;
  startAngle: number;
  endAngle: number;
}

// Interface for outer segment information
interface OuterSegmentInfo {
  path: string;
  color: string;
  borderColor: string;
  labelColor: string;
  subtitleColor?: string;
  title: string;
  midAngle: number;
  isActive: boolean;
  startAngle: number;
  endAngle: number;
}

const GreedIndexChart: React.FC<GreedIndexChartProps> = ({
  setSelectedSegment,
  titles,
  percentages,
  colors,
  borderColors,
  borderWidth = 1,
  showBorders = true, // Default to showing borders
  showBorderOnActiveSegmentOnly = false, // Default to showing borders on all segments
  gapDegrees = 0,
  gapColor, // No default, transparent if not specified
  gapThickness = 1, // Default to same thickness as segments
  showBackgroundTrack = false, // Default to not showing background track
  backgroundTrackColor = '#E5E7EB', // Default to light gray
  size = 300,
  showLabels = true,
  className = '',
  needleValue = 0,
  showNeedle = true,
  showValue = true, // Default to showing the value
  rotation = 0, // Default is right half (0 degrees rotation)
  arcSpan = 180, // Default is a half circle (180 degrees)
  thickness = 0.2, // Default thickness is 20% of radius
  labelColors,
  labelFontSize = 12,
  labelFontWeight = 'normal',
  valueFontSize = 16,
  valueFontWeight = 'bold',
  valueColor = '#333',
  highlightActiveLabel = false, // Default to not highlighting the active label
  padding = 40, // Default padding to accommodate labels
  dashedElements = [], // Default to no dashed elements
  dashWidth = 3, // Default dash width
  dashGap = 5, // Default gap between dashes
  showOuterSegments = false, // Default to not showing outer segments
  outerSegmentTitles, // No default, will use main titles if not provided
  outerSegmentColors, // No default, will use main colors if not provided
  outerSegmentActiveColors, // No default, will use darker versions of outer colors if not provided
  outerSegmentBorderColors, // No default, will use darker versions of outer colors if not provided
  outerSegmentThickness = 0.15, // Default thickness for outer segments
  outerSegmentGap = 2, // Default gap between outer segments
  outerSegmentOffset = 0.05, // Default offset between main gauge and outer segments
  showOuterLabels = true, // Default to showing outer labels
  outerLabelColors, // No default, will use outer segment colors if not provided
  outerLabelFontSize = 10, // Default font size for outer labels
  outerLabelFontWeight = 'normal', // Default font weight for outer labels
  showOuterSegmentBorders = true, // Default to showing borders on outer segments
  showOuterSegmentBorderOnActiveOnly = false, // Default to showing borders on all outer segments
  outerActiveLabelFontWeight = 'bold', // Default to bold for active labels
  activeColors, // No default, will use main colors if not provided
  dashedElementActiveColors, // Colors for active dashed elements
  needleColor = '#333333', // Default to dark gray
  needleBaseColor = '#333333', // Default to match needle color
  needleBaseSize = 10, // Default base circle size
  needleWidth = 4, // Default needle width/thickness
  needleLength = 1.05, // Default to 105% of radius length
  needleBaseBorderColor = '#ffffff', // Default to white border
  needleBaseBorderWidth = 1, // Default border width
  animateNeedle = true, // Default to animating the needle
  animationDuration = 500, // Default to 500ms animation
  animationSteps = 30, // Default to 30 steps for smooth animation
  showInnerArc = false,
  innerArcOffset = 0.3, // Default to 30% of thickness as offset
  innerArcThickness = 0.6, // Default to 60% of main thickness
  innerArcStartColor = 'rgba(255, 255, 255, 0.08)',
  innerArcEndColor = 'rgba(255, 255, 255, 0.0)',
  innerArcBorderColor = 'rgba(255, 255, 255, 0.05)',
  innerArcBorderWidth = 1,
  innerArcSpan, // Default to undefined, will use main arcSpan if not specified
  innerArcGradientAngle = 190, // Default to 190 degrees (similar to your example)
  innerArcHideBottomBorder = false, // Default to showing all borders
  showIndexLabels = false,
  leftIndexLabel = 'Index: 0',
  rightIndexLabel = 'Index: 100%',
  indexLabelColor = 'rgba(255, 255, 255, 0.6)',
  indexLabelFontSize = 12,
  indexLabelFontWeight = 400,
  indexLabelOffsetY = -100, // Changed default to match your working value
  indexLabelOffsetX = 0, // Default horizontal offset
  leftIndexLabelOffsetX = 0, // Default additional offset for left label
  rightIndexLabelOffsetX = 0, // Default additional offset for right label
  segmentSubtitles = [], // Array of subtitles for each segment
  outerSegmentSubtitles = [],
  outerSubtitleFontSize = 10,
  outerSubtitleFontWeight = 'normal',
  outerSubtitleOffset = 15,
  outerSubtitleColors = [],
  outerLabelOffset = 0, // Default to no offset
  showIndicator = false,
  indicatorValue = 50, // Default to middle
  indicatorColor = '#FF5733',
  indicatorBaseWidth = 10,
  indicatorLength = 15,
  indicatorOffset = 5, // Default offset from inner radius
  indicatorTransitionDuration = 1500, // Match the needle transition duration
  indicatorSpringConfig = {
    tension: 0.34,
    friction: 0.64,
    precision: 1.56
  },
}) => {
  // Ensure percentages are provided and sorted
  if (!percentages || percentages.length !== titles.length) {
    console.error('GreedIndexChart: percentages array must match titles array length');
    return null;
  }
  
  // Default colors if not provided
  const defaultColors = [
    '#E15241', // Red (Extreme Fear)
    '#E87F34', // Orange (Fear)
    '#F5C710', // Yellow (Neutral)
    '#8CC474', // Light Green (Greed)
    '#39A853', // Green (Extreme Greed)
  ];
  
  // Set up chart colors, using defaults if not provided
  const chartColors = colors || defaultColors.slice(0, titles.length);
  
  // Default border colors (darker shades of the fill colors)
  const defaultBorderColors = chartColors.map(color => {
    // Simple darkening of the color
    return color.replace(/[0-9a-f]{2}/gi, (hex) => {
      const num = parseInt(hex, 16);
      return Math.max(0, num - 30).toString(16).padStart(2, '0');
    });
  });
  
  // Set up border colors, using defaults if not provided
  const chartBorderColors = borderColors || defaultBorderColors;
  
  // Set up label colors, using segment colors if not provided
  const chartLabelColors = labelColors || chartColors;
  
  // Set up outer segment titles, using main titles if not provided
  const chartOuterSegmentTitles = outerSegmentTitles || titles;
  
  // Set up outer segment colors, using main colors if not provided
  const chartOuterSegmentColors = outerSegmentColors || chartColors;
  
  // Set up outer segment active colors, using darker versions of outer colors if not provided
  const defaultOuterSegmentActiveColors = chartOuterSegmentColors.map(color => {
    // Simple darkening of the color
    return color.replace(/[0-9a-f]{2}/gi, (hex) => {
      const num = parseInt(hex, 16);
      return Math.max(0, num - 50).toString(16).padStart(2, '0');
    });
  });
  
  const chartOuterSegmentActiveColors = outerSegmentActiveColors || defaultOuterSegmentActiveColors;
  
  // Set up outer segment border colors, using darker versions of outer colors if not provided
  const defaultOuterSegmentBorderColors = chartOuterSegmentColors.map(color => {
    // Simple darkening of the color
    return color.replace(/[0-9a-f]{2}/gi, (hex) => {
      const num = parseInt(hex, 16);
      return Math.max(0, num - 30).toString(16).padStart(2, '0');
    });
  });
  
  const chartOuterSegmentBorderColors = outerSegmentBorderColors || defaultOuterSegmentBorderColors;
  
  // Set up outer label colors, using outer segment colors if not provided
  const chartOuterLabelColors = outerLabelColors || chartOuterSegmentColors;
  
  // Set default subtitle colors if not provided
  const chartOuterSubtitleColors = outerSubtitleColors.length > 0 
    ? outerSubtitleColors 
    : Array(titles.length).fill('#000000');
  
  // Basic dimensions
  const center = size / 2;
  const radius = center * 0.8; // Slightly smaller than half size to leave room for labels
  const innerRadius = radius * (1 - thickness); // Inner radius based on thickness
  
  // Calculate outer segment dimensions
  const outerSegmentStartRadius = radius + (radius * outerSegmentOffset);
  const outerSegmentEndRadius = outerSegmentStartRadius + (radius * outerSegmentThickness);
  
  // Calculate gap dimensions if gap color is provided
  const hasVisibleGaps = gapColor && gapDegrees > 0;
  const gapOuterRadius = hasVisibleGaps ? 
    radius - ((radius - innerRadius) * (1 - gapThickness) / 2) : 
    radius;
  const gapInnerRadius = hasVisibleGaps ? 
    innerRadius + ((radius - innerRadius) * (1 - gapThickness) / 2) : 
    innerRadius;
  
  /**
   * Converts polar coordinates to cartesian coordinates
   * Used for calculating points on the arc
   */
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    // Adjust angle based on rotation
    const adjustedAngle = angleInDegrees + rotation;
    const angleInRadians = (adjustedAngle - 90) * Math.PI / 180.0;
    
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  /**
   * Creates an SVG arc path
   * Used for drawing the gauge segments
   */
  const describeArc = (x: number, y: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number) => {
    const outerStart = polarToCartesian(x, y, outerRadius, endAngle);
    const outerEnd = polarToCartesian(x, y, outerRadius, startAngle);
    const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", outerStart.x, outerStart.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "L", outerStart.x, outerStart.y,
      "Z"
    ].join(" ");
  };
  
  // State to track which segment is being hovered
  const [hoveredSegmentIndex, setHoveredSegmentIndex] = useState<number | null>(null);
  
  // Add this state variable near your other state declarations
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  
  // Set up active colors, using main colors if not provided
  const chartActiveColors = activeColors || chartColors;
  
  // Add state for tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState({ title: '', subtitle: '', color: '' });
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Create segments from the color stops
  const segments: Segment[] = [];
  for (let i = 0; i < titles.length; i++) {
    const startPercent = i === 0 ? 0 : percentages[i - 1];
    const endPercent = percentages[i];
    
    // Skip if start and end are the same (zero-width segment)
    if (startPercent === endPercent) continue;
    
    segments.push({
      title: titles[i],
      subtitle: segmentSubtitles[i] || '', // Use subtitle if provided
      startPercent,
      endPercent,
      color: chartColors[i],
      activeColor: chartActiveColors[i],
      borderColor: chartBorderColors[i],
      labelColor: chartLabelColors[i],
      isDashed: dashedElements[i] || false,
      dashedActiveColor: dashedElementActiveColors?.[i]
    });
  }
  
  // Sort segments by percentage to ensure proper ordering
  segments.sort((a, b) => a.startPercent - b.startPercent);
  
  // Find which segment contains the current value
  const getActiveSegmentIndex = () => {
    for (let i = 0; i < segments.length; i++) {
      if (needleValue <= segments[i].endPercent && needleValue >= segments[i].startPercent) {
        setSelectedSegment(i);
        return i;
      }
    }
    return -1; // No active segment (value outside all segments)
  };
  
  const activeSegmentIndex = getActiveSegmentIndex();
  
  // Create arc paths for each segment
  const arcs: ArcInfo[] = [];
  const gaps: GapInfo[] = [];
  
  // Calculate the angle represented by one percentage point
  const anglePerPercentage = arcSpan / 100;
  
  // Calculate how much angle each gap takes
  const gapAngle = gapDegrees;
  
  // Track the current angle position
  let currentAngle = 0;
  
  segments.forEach((segment, index) => {
    // Calculate segment width in percentage points
    const segmentWidth = segment.endPercent - segment.startPercent;
    
    // Calculate how much of the arc this segment should take up (in degrees)
    const rawSegmentAngle = segmentWidth * anglePerPercentage;
    
    // Subtract a portion of the gap from this segment's width
    // For the last segment, don't subtract anything to ensure it ends at the right position
    const gapAdjustment = index < segments.length - 1 ? gapAngle : 0;
    const adjustedSegmentAngle = rawSegmentAngle - gapAdjustment;
    
    // Calculate start and end angles for this segment
    const startAngle = currentAngle;
    const endAngle = startAngle + adjustedSegmentAngle;
    
    // Calculate the midpoint angle for label positioning
    const midAngle = (startAngle + endAngle) / 2;
    
    // Determine if this is the active segment
    const isActive = needleValue >= segment.startPercent && needleValue <= segment.endPercent;
    
    // Determine if this segment is being hovered
    const isHovered = hoveredSegmentIndex === index;
    
    // Use active color if this segment is active or hovered
    const segmentColor = (isActive || isHovered) && segment.activeColor ? 
      segment.activeColor : segment.color;
    
    arcs.push({
      path: describeArc(center, center, radius, innerRadius, startAngle, endAngle),
      color: segmentColor,
      borderColor: segment.borderColor,
      labelColor: segment.labelColor,
      title: segment.title,
      subtitle: segment.subtitle, // Add subtitle to arc info
      midAngle,
      isActive,
      isHovered,
      startPercent: segment.startPercent,
      endPercent: segment.endPercent,
      isDashed: segment.isDashed,
      dashedActiveColor: segment.dashedActiveColor,
      startAngle,
      endAngle,
      index // Store the index for hover handling
    });
    
    // Create a gap after this segment (except for the last one)
    if (index < segments.length - 1 && gapAngle > 0) {
      const gapStartAngle = endAngle;
      const gapEndAngle = gapStartAngle + gapAngle;
      
      gaps.push({
        path: describeArc(center, center, gapOuterRadius, gapInnerRadius, gapStartAngle, gapEndAngle),
        startAngle: gapStartAngle,
        endAngle: gapEndAngle
      });
    }
    
    // Update the current angle for the next segment, adding the gap
    currentAngle = endAngle + gapAngle;
  });
  
  // Calculate the background track path if needed
  let backgroundTrackPath = '';
  if (showBackgroundTrack) {
    // Get the last segment's end angle
    const lastSegmentEndAngle = currentAngle - gapAngle; // Subtract the last gap (which wasn't added)
    
    // Only create a background track if there's space remaining
    if (lastSegmentEndAngle < arcSpan) {
      backgroundTrackPath = describeArc(center, center, radius, innerRadius, lastSegmentEndAngle, arcSpan);
    }
  }
  
  // State to track the current animated needle value
  const [animatedValue, setAnimatedValue] = useState(needleValue);
  
  // Ref to store the previous needle value for animation
  const prevNeedleValueRef = useRef(needleValue);
  
  // Ref to store animation frame ID for cleanup
  const animationFrameRef = useRef<number | null>(null);
  
  // Effect to handle needle value changes and animation
  useEffect(() => {
    // If animation is disabled, just set the value directly
    if (!animateNeedle) {
      setAnimatedValue(needleValue);
      return;
    }
    
    // Get the previous value
    const prevValue = prevNeedleValueRef.current;
    
    // Store the current value for next time
    prevNeedleValueRef.current = needleValue;
    
    // If values are the same, no need to animate
    if (prevValue === needleValue) {
      return;
    }
    
    // Calculate the total change in value
    const valueDiff = needleValue - prevValue;
    
    // Calculate the time per step
    const stepDuration = animationDuration / animationSteps;
    
    // Track the start time of the animation
    const startTime = Date.now();
    
    // Function to update the animation frame
    const animateFrame = () => {
      // Calculate how much time has passed
      const elapsed = Date.now() - startTime;
      
      // Calculate the progress (0 to 1)
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Use easeInOutCubic for smoother animation
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      // Calculate the current value based on progress
      const currentValue = prevValue + valueDiff * easedProgress;
      
      // Update the animated value
      setAnimatedValue(currentValue);
      
      // Continue the animation if not complete
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateFrame);
      }
    };
    
    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animateFrame);
    
    // Cleanup function to cancel animation if component unmounts or value changes again
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [needleValue, animateNeedle, animationDuration, animationSteps]);
  
  // Calculate the angle for the needle based on the animated value
  const needleAngle = (animatedValue / 100) * arcSpan;
  
  /**
   * Calculates the points for the needle polygon
   * Creates a thinner, more customizable needle
   */
  const needlePoints = () => {
    // Calculate the tip of the needle (slightly beyond the outer radius)
    const tipLength = radius * needleLength;
    const tip = polarToCartesian(center, center, tipLength, needleAngle);
    
    // Calculate the base width points
    // Use the actual needleWidth value to control thickness
    const baseWidth = needleWidth;
    const leftBase = {
      x: center + Math.cos((needleAngle - 90) * Math.PI / 180) * baseWidth,
      y: center + Math.sin((needleAngle - 90) * Math.PI / 180) * baseWidth
    };
    
    const rightBase = {
      x: center + Math.cos((needleAngle + 90) * Math.PI / 180) * baseWidth,
      y: center + Math.sin((needleAngle + 90) * Math.PI / 180) * baseWidth
    };
    
    // Return the points as a string for the polygon
    return `${tip.x},${tip.y} ${leftBase.x},${leftBase.y} ${center},${center} ${rightBase.x},${rightBase.y}`;
  };
  
  /**
   * Determines the position for the central value text
   * Adjusts based on the rotation of the gauge
   */
  const getValueTextPosition = () => {
    if (rotation === 0) return { x: center, y: center - radius/2 }; // Right half
    if (rotation === 90) return { x: center + radius/2, y: center }; // Bottom half
    if (rotation === 180) return { x: center, y: center + radius/2 }; // Left half
    if (rotation === 270) return { x: center - radius/2, y: center }; // Top half
    
    // Default fallback
    return { x: center, y: center };
  };
  
  const valueTextPos = getValueTextPosition();

  // Calculate label distance based on thickness
  const labelDistance = radius + 10 + (thickness * 20); // Adjust label distance based on thickness

  // Calculate the actual dimensions needed for the SVG
  const effectiveSize = size + (padding * 2);
  const viewBoxSize = effectiveSize;
  const viewBoxOffset = padding;

  /**
   * Determines if a border should be shown for a segment
   * Based on showBorders and showBorderOnActiveSegmentOnly props
   */
  const shouldShowBorder = (arc: ArcInfo) => {
    if (!showBorders) return false;
    if (showBorderOnActiveSegmentOnly) return arc.isActive;
    return true;
  };

  /**
   * Creates dashed pattern lines for a segment
   * Generates vertical lines within the segment arc
   */
  const createDashedPattern = (arc: ArcInfo) => {
    const lines = [];
    const totalAngle = arc.endAngle - arc.startAngle;
    
    // Start the first dash after the gap (if there is one)
    const startOffset = gapDegrees / 2; // Half the gap degrees to offset from the start
    const numDashes = Math.floor((totalAngle - startOffset) / (dashWidth + dashGap));
    
    for (let i = 0; i < numDashes; i++) {
      const dashAngle = arc.startAngle + startOffset + i * (dashWidth + dashGap);
      
      // Only create the dash if it fits within the segment
      if (dashAngle + dashWidth <= arc.endAngle - (gapDegrees / 2)) {
        const dashPath = describeArc(
          center, 
          center, 
          radius, 
          innerRadius, 
          dashAngle, 
          dashAngle + dashWidth
        );
        
        // Use active color if this segment is active or hovered
        const dashColor = (arc.isActive || arc.isHovered) && arc.dashedActiveColor ? 
          arc.dashedActiveColor : arc.color;
        
        lines.push(
          <path
            key={`dash-${arc.title}-${i}`}
            d={dashPath}
            fill={dashColor}
            stroke={shouldShowBorder(arc) ? arc.borderColor : 'none'}
            strokeWidth={borderWidth}
            onMouseEnter={() => {setHoveredSegmentIndex(arc.index); handleSegmentHover(arc, `segment-${arc.index}`)}}
            onMouseLeave={() => {setHoveredSegmentIndex(null); handleSegmentLeave()}}
            pointerEvents="all"
            
          />
        );
      }
    }
    
    return lines;
  };

  // Create outer segment paths
  const outerSegments: OuterSegmentInfo[] = [];
  
  if (showOuterSegments) {
    // Track the current angle position for outer segments
    let outerCurrentAngle = 0;
    
    segments.forEach((segment, index) => {
      // Calculate segment width in percentage points
      const segmentWidth = segment.endPercent - segment.startPercent;
      
      // Calculate how much of the arc this segment should take up (in degrees)
      const rawSegmentAngle = segmentWidth * anglePerPercentage;
      
      // Subtract a portion of the gap from this segment's width
      // For the last segment, don't subtract anything to ensure it ends at the right position
      const gapAdjustment = index < segments.length - 1 ? outerSegmentGap : 0;
      const adjustedSegmentAngle = rawSegmentAngle - gapAdjustment;
      
      // Calculate start and end angles for this segment
      const startAngle = outerCurrentAngle;
      const endAngle = startAngle + adjustedSegmentAngle;
      
      // Calculate the midpoint angle for label positioning
      const midAngle = (startAngle + endAngle) / 2;
      
      // Determine if this is the active segment
      const isActive = index === activeSegmentIndex;
      
      // Use active color for active segment if provided
      const segmentColor = isActive ? 
        chartOuterSegmentActiveColors[index] : chartOuterSegmentColors[index];
      
      outerSegments.push({
        path: describeArc(center, center, outerSegmentEndRadius, outerSegmentStartRadius, startAngle, endAngle),
        color: segmentColor,
        borderColor: chartOuterSegmentBorderColors[index],
        labelColor: chartOuterLabelColors[index],
        subtitleColor: chartOuterSubtitleColors[index],
        title: chartOuterSegmentTitles[index],
        midAngle,
        isActive,
        startAngle,
        endAngle
      });
      
      // Update the current angle for the next segment, adding the gap
      outerCurrentAngle = endAngle + outerSegmentGap;
    });
  }
  
  /**
   * Calculates the position and rotation for outer segment labels and subtitles
   * Labels are positioned inside the segments and rotated to follow the arc
   */
  const getOuterLabelTransform = (segment: OuterSegmentInfo, isSubtitle = false) => {
    // Calculate label position at the middle of the segment
    const labelRadius = (outerSegmentStartRadius + outerSegmentEndRadius) / 2;
    const labelPos = polarToCartesian(center, center, labelRadius, segment.midAngle);
    
    // Calculate rotation angle - labels follow the arc
    // Adjust based on which quadrant the label is in
    let rotationAngle = segment.midAngle + rotation;
    
    // For labels on the bottom half, flip them 180 degrees so they're not upside down
    if (rotationAngle > 90 && rotationAngle < 270) {
      rotationAngle += 180;
    }
    
    // Calculate the offset direction based on the rotation
    const offsetX = Math.sin(rotationAngle * Math.PI / 180);
    const offsetY = -Math.cos(rotationAngle * Math.PI / 180);
    
    if (isSubtitle) {
      // For subtitles, add the subtitle offset
      return `translate(${labelPos.x + offsetX * outerSubtitleOffset}, ${labelPos.y + offsetY * outerSubtitleOffset}) rotate(${rotationAngle})`;
    } else {
      // For main titles, add the main title offset
      return `translate(${labelPos.x + offsetX * outerLabelOffset}, ${labelPos.y + offsetY * outerLabelOffset}) rotate(${rotationAngle})`;
    }
  };

  // Helper function to determine if an outer segment should show its border
  const shouldShowOuterSegmentBorder = (segment: OuterSegmentInfo) => {
    if (!showOuterSegmentBorders) return false;
    if (showOuterSegmentBorderOnActiveOnly) return segment.isActive;
    return true;
  };

  // Calculate inner arc dimensions
  const innerArcSpanValue = innerArcSpan !== undefined ? innerArcSpan : arcSpan;
  const innerArcOuterRadius = innerRadius - (radius - innerRadius) * innerArcOffset;
  const innerArcInnerRadius = innerArcOuterRadius - (radius - innerRadius) * innerArcThickness;
  
  // Create standard inner arc path
  const innerArcPath = describeArc(
    center, 
    center, 
    innerArcOuterRadius, 
    innerArcInnerRadius, 
    0, 
    innerArcSpanValue
  );
  
  // For half-circle with no bottom border, create separate paths
  const topArcPath = innerArcHideBottomBorder && innerArcSpanValue === 180 
    ? `M ${center - innerArcOuterRadius} ${center} A ${innerArcOuterRadius} ${innerArcOuterRadius} 0 0 1 ${center + innerArcOuterRadius} ${center}`
    : '';
    
  const innerArcPath2 = innerArcHideBottomBorder && innerArcSpanValue === 180
    ? `M ${center + innerArcInnerRadius} ${center} A ${innerArcInnerRadius} ${innerArcInnerRadius} 0 0 0 ${center - innerArcInnerRadius} ${center}`
    : '';
  
  // Calculate gradient coordinates based on angle
  const calculateGradientCoordinates = (angleDegrees: number) => {
    // Convert angle to radians
    const angleRadians = (angleDegrees * Math.PI) / 180;
    
    // Calculate start point (x1, y1) and end point (x2, y2)
    // We use 0.5 as the center point (50%) and move in the direction of the angle
    const x1 = 0.5 - 0.5 * Math.cos(angleRadians);
    const y1 = 0.5 - 0.5 * Math.sin(angleRadians);
    const x2 = 0.5 + 0.5 * Math.cos(angleRadians);
    const y2 = 0.5 + 0.5 * Math.sin(angleRadians);
    
    // Convert to percentages and return
    return {
      x1: `${x1 * 100}%`,
      y1: `${y1 * 100}%`,
      x2: `${x2 * 100}%`,
      y2: `${y2 * 100}%`,
    };
  };
  
  // Get gradient coordinates based on the angle
  const gradientCoords = calculateGradientCoordinates(innerArcGradientAngle);

  // Calculate positions for index labels with all offsets applied
  const leftLabelX = center - radius * 0.9 + indexLabelOffsetX + leftIndexLabelOffsetX;
  const rightLabelX = center + radius * 0.9 + indexLabelOffsetX + rightIndexLabelOffsetX;
  const labelsY = center + indexLabelOffsetY; // Position based on center plus offset

  // Handle mouse move for tooltip positioning
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!chartRef.current) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };
  
  // Update the function to use the same subtitle data for both segment types
  const handleSegmentHover = (arc: ArcInfo | OuterSegmentInfo, segmentId: string) => {
    let index = 0;
    
    // Get the correct index based on segment type
    if ('index' in arc) {
      // Inner segment
      index = arc.index;
      setHoveredSegmentIndex(arc.index);
    } else if (segmentId.startsWith('outer-segment-')) {
      // Outer segment - extract index from ID
      index = parseInt(segmentId.replace('outer-segment-', ''));
    }
    
    setHoveredSegmentId(segmentId);
    
    // Use the same subtitle data for both inner and outer segments
    const subtitle = segmentSubtitles[index] || '';
    
    setTooltipContent({
      title: arc.title,
      subtitle: subtitle,
      color: arc.labelColor || '#000000'
    });
    
    setTooltipVisible(true);
  };
  
  // Handle segment leave
  const handleSegmentLeave = () => {
    setHoveredSegmentIndex(null);
    setTooltipVisible(false);
  };

  return (
    <div 
      className={`w-full flex flex-col items-center justify-center ${className} relative`}
      ref={chartRef}
      onMouseMove={handleMouseMove}
    >
      {/* 
        Responsive SVG with viewBox that includes padding for labels
        Uses percentage dimensions to fit container while maintaining aspect ratio
      */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`${-viewBoxOffset} ${-viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      >
        {/* Define gradient for inner arc with angle control */}
        <defs>
          <linearGradient 
            id="innerArcGradient" 
            x1={gradientCoords.x1} 
            y1={gradientCoords.y1} 
            x2={gradientCoords.x2} 
            y2={gradientCoords.y2}
          >
            <stop offset="0%" stopColor={innerArcStartColor} />
            <stop offset="100%" stopColor={innerArcEndColor} />
          </linearGradient>
        </defs>
        
        {/* Background track (if enabled) */}
        {showBackgroundTrack && (
          <path
            d={describeArc(center, center, radius, innerRadius, 0, arcSpan)}
            fill={backgroundTrackColor}
            stroke="none"
          />
        )}
        
        {/* Inner arc with gradient (if enabled) */}
        {showInnerArc && (
          <>
            {innerArcHideBottomBorder && innerArcSpanValue === 180 ? (
              // Special case for half-circle with no bottom border
              <>
                {/* Create a clipping path for the gradient */}
                <defs>
                  <clipPath id="innerArcClip">
                    <path d={innerArcPath} />
                  </clipPath>
                </defs>
                
                {/* Gradient-filled rectangle with clipping */}
                <rect
                  x={center - innerArcOuterRadius}
                  y={center - innerArcOuterRadius}
                  width={innerArcOuterRadius * 2}
                  height={innerArcOuterRadius}
                  fill="url(#innerArcGradient)"
                  clipPath="url(#innerArcClip)"
                />
                
                {/* Top outer arc border */}
                {innerArcBorderWidth > 0 && (
                  <>
                    <path
                      d={topArcPath}
                      fill="none"
                      stroke={innerArcBorderColor}
                      strokeWidth={innerArcBorderWidth}
                    />
                    
                    {/* Inner arc border */}
                    <path
                      d={innerArcPath2}
                      fill="none"
                      stroke={innerArcBorderColor}
                      strokeWidth={innerArcBorderWidth}
                    />
                  </>
                )}
              </>
            ) : (
              // Standard case - full borders
              <path
                d={innerArcPath}
                fill="url(#innerArcGradient)"
                stroke={innerArcBorderColor}
                strokeWidth={innerArcBorderWidth}
              />
            )}
          </>
        )}
        
        {/* Outer segments */}
        {showOuterSegments && (
          <g>
            {outerSegments.map((segment, index) => (
              <g key={`outer-segment-${index}`}>
                <path
                  d={segment.path}
                  fill={segment.color}
                  stroke={shouldShowOuterSegmentBorder(segment) ? segment.borderColor : 'none'}
                  strokeWidth={borderWidth}
                  onMouseEnter={() => handleSegmentHover(segment, `outer-segment-${index}`)}
                  onMouseLeave={handleSegmentLeave}
                />
                
                {/* Outer segment label */}
                {showOuterLabels && (
                  <>
                    <text
                      transform={getOuterLabelTransform(segment)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={outerLabelFontSize}
                      fontWeight={segment.isActive ? outerActiveLabelFontWeight : outerLabelFontWeight}
                      // fill={segment.labelColor} // turn on to activate the color on the outer segments
                      className="outer-segment-label"
                      onMouseEnter={() => handleSegmentHover(segment, `outer-segment-${index}`)}
                      onMouseLeave={() => handleSegmentLeave()}
                      pointerEvents="all"
                    >
                      {segment.title}
                    </text>
                    
                    {/* Outer segment subtitle */}
                    {outerSegmentSubtitles[index] && (
                      <text
                        transform={getOuterLabelTransform(segment, true)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={outerSubtitleFontSize}
                        fontWeight={outerSubtitleFontWeight}
                        fill={segment.subtitleColor || '#000000'}
                        className="outer-segment-subtitle"
                        opacity={0.8}
                        onMouseEnter={() => handleSegmentHover(segment, `outer-segment-${index}`)}
                        onMouseLeave={() => handleSegmentLeave()}
                        pointerEvents="all"
                      >
                        {outerSegmentSubtitles[index]}
                      </text>
                    )}
                  </>
                )}
              </g>
            ))}
          </g>
        )}
        
        {/* Arc segments */}
        <g>
          {arcs.map((arc, index) => (
            arc.isDashed ? (
              // Render dashed pattern for this segment
              <React.Fragment key={`segment-${index}`}>
                {createDashedPattern(arc)}
              </React.Fragment>
            ) : (
              // Render solid segment
              <path
                key={`segment-${index}`}
                d={arc.path}
                fill={arc.color}
                stroke={shouldShowBorder(arc) ? arc.borderColor : 'none'}
                strokeWidth={borderWidth}
                onMouseEnter={() => handleSegmentHover(arc, `segment-${index}`)}
                onMouseLeave={handleSegmentLeave}
              />
            )
          ))}
          
          {/* Gaps between segments (if gap color is provided) */}
          {hasVisibleGaps && gaps.map((gap, index) => (
            <path
              key={`gap-${index}`}
              d={gap.path}
              fill={gapColor}
              stroke="none"
              onMouseEnter={() => {
                // For gaps, use the data from the adjacent segment (lower index)
                const segmentIndex = Math.max(0, index);
                const segment = arcs[segmentIndex];
                handleSegmentHover(segment, `segment-${segmentIndex}`);
              }}
              onMouseLeave={() => handleSegmentLeave()}
              pointerEvents="all"
            />
          ))}
        </g>
        
        {/* For gaps between inner and outer segments (if needed) */}
        {showOuterSegments && segments.map((segment, index) => {
          const startAngle = (segment.startPercent / 100) * arcSpan;
          const endAngle = (segment.endPercent / 100) * arcSpan;
          
          // Create a path for the gap area between inner and outer segments
          const gapPath = describeArc(
            center, 
            center, 
            outerSegmentStartRadius, // Start at the inner edge of outer segment
            radius, // End at the outer edge of inner segment
            startAngle, 
            endAngle
          );
          
          return (
            <path
              key={`gap-hover-${index}`}
              d={gapPath}
              fill="transparent" // Invisible
              stroke="none"
              onMouseEnter={() => handleSegmentHover(arcs[index], `segment-${index}`)}
              onMouseLeave={() => handleSegmentLeave()}
              pointerEvents="all"
            />
          );
        })}
        
        {/* Needle indicator - now using animatedValue */}
        {showNeedle && (
          <>
            {/* Needle triangle */}
            <polygon 
              points={needlePoints()} 
              fill={needleColor} 
              stroke="none"
            />
            {/* Center circle of needle */}
            <circle 
              cx={center} 
              cy={center} 
              r={needleBaseSize} 
              fill={needleBaseColor} 
              stroke={needleBaseBorderColor}
              strokeWidth={needleBaseBorderWidth}
            />
          </>
        )}
        
        {/* Segment labels */}
        {showLabels && arcs.map((arc, index) => {
          // Calculate position for this label
          const labelPos = polarToCartesian(center, center, labelDistance, arc.midAngle);
          
          return (
            <text
              key={`label-${index}`}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={labelFontSize}
              fontWeight={highlightActiveLabel && arc.isActive ? 'bold' : labelFontWeight}
              fill={arc.labelColor}
            >
              {arc.title}
            </text>
          );
        })}
        
        {/* Index labels with adjustable positioning */}
        {showIndexLabels && (
          <>
            {/* Left index label */}
            <text
              x={leftLabelX}
              y={labelsY}
              textAnchor="start"
              fontSize={indexLabelFontSize}
              fontWeight={indexLabelFontWeight}
              fill={indexLabelColor}
              className="index-label left-index-label"
            >
              {leftIndexLabel}
            </text>
            
            {/* Right index label */}
            <text
              x={rightLabelX}
              y={labelsY}
              textAnchor="end"
              fontSize={indexLabelFontSize}
              fontWeight={indexLabelFontWeight}
              fill={indexLabelColor}
              className="index-label right-index-label"
            >
              {rightIndexLabel}
            </text>
          </>
        )}
        
        {/* Triangle indicator (using separate component) */}
        {showIndicator && (
          <GaugeIndicator
            center={center}
            innerRadius={innerRadius}
            arcSpan={arcSpan}
            rotation={rotation}
            value={indicatorValue}
            color={indicatorColor}
            baseWidth={indicatorBaseWidth}
            length={indicatorLength}
            offset={indicatorOffset}
            transitionDuration={indicatorTransitionDuration}
            springConfig={indicatorSpringConfig}
          />
        )}
      </svg>
      
      {/* Tooltip */}
      <GaugeTooltip
        title={tooltipContent.title}
        subtitle={tooltipContent.subtitle}
        color={tooltipContent.color}
        position={tooltipPosition}
        visible={tooltipVisible}
      />
      
    </div>
  );
};

export default GreedIndexChart;