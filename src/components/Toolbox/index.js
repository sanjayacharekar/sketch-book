import React from "react";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { useSelector } from "react-redux";
const Toolbox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOptions = activeMenuItem === MENU_ITEMS.ERASER || activeMenuItem === MENU_ITEMS.PENCIL;

  const updateBrushSize = () => {};
  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOptions && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLUE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.GREEN }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.ORANGE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.WHITE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.RED }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.YELLOW }}
            />
          </div>
        </div>
      )}
      {showBrushToolOptions && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>{activeMenuItem === MENU_ITEMS.PENCIL ? 'Brush'  : 'Eraser'} Size</h4>

          <div className={styles.itemContainer}>
            <input type="range" min={1} max={10} onChange={updateBrushSize} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
