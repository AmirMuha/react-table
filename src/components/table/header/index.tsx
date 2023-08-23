import { useState } from "react";
import { TableColumn } from "components/table";
import { RowClasses } from "../row";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import HeaderCell, { HeaderCellClasses } from "./cell";

export type HeaderClasses = {
  root?: string;
  cell?: HeaderCellClasses;
  row?: RowClasses;
};
interface HeaderProps<T> {
  columns: TableColumn<T>[];
  onSort: (columnAccessor: keyof T) => void;
  sortedColumn: keyof T | null;
  sortDirection: "asc" | "desc";
  onFilterChange: (columnAccessor: keyof T, value: any) => void;
  classes?: HeaderClasses;
  overrideClasses?: HeaderClasses;
}

const Header = <T extends object>(props: HeaderProps<T>) => {
  const [columns, setColumns] = useState<TableColumn<T>[]>(props.columns);
  const onResize = (columnIndex: number, newWidth: number) => {
    setColumns((prevColumns: TableColumn<T>[]) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[columnIndex].width = newWidth;
      return updatedColumns;
    });
  };

  return (
    <thead
      className={coalesce(
        props.overrideClasses?.root,
        sc(props.classes?.root, "am_table__header am_table__header--root")
      )}
    >
      <tr
        className={coalesce(
          props.overrideClasses?.row?.root,
          sc(
            props.classes?.row?.root,
            "am_table__header--row am_table__header__row--root"
          )
        )}
      >
        {columns.map((column, columnIndex) => (
          <HeaderCell
            key={column.header}
            column={column}
            width={column.width}
            onResize={(e, { width }) => onResize(columnIndex, width)}
            onClick={() => props.onSort(column.name)}
            classes={props.classes?.cell}
          >
            {column.header}
            {column.filterable ? (
              <div className="filter-input">
                <input
                  type="text"
                  onChange={(e) =>
                    props.onFilterChange(column.name, e.target.value)
                  }
                  placeholder="جستجو"
                />
              </div>
            ) : null}
            {props.sortedColumn === column.name && (
              <span className="sort-icon">
                {props.sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </HeaderCell>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
