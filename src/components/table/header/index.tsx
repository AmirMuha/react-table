import { useState } from "react";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import HeaderCell from "./cell";
import { HeaderProps, TableColumn } from "types";

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
