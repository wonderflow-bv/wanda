export type CartesianBaseBrushProps = {
  position: {
    top: number;
    left: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  isVisible?: boolean;
}

export const CartesianBaseBrush: React.FC<CartesianBaseBrushProps> = ({
  position,
  dimension,
  isVisible = false,
}) => {
  if (!isVisible) return null;

  return (<rect x={position.left} y={position.top} width={dimension.maxWidth} height={50} fill="url(#cartesian-grid-background)" stroke="#999" strokeDasharray="2,3" />);
};

CartesianBaseBrush.displayName = 'CartesianBaseBrush';
