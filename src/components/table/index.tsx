import React, { useState } from "react";
import Body, { BodyClasses } from "components/table/body";
import Header, { HeaderClasses } from "components/table/header";
import sc from "common/helper/sc";
import { RowProps } from "./row";
import { CellInfo, CellProps } from "./cell";
import { FooterClasses } from "./footer";
import coalesce from "common/helper/coalesce";

export type ContainerClasses = { root?: string; wrapper?: WrapperClasses };
export type WrapperClasses = { root?: string; table?: TableClasses };
export type TableClasses = {
  root?: string;
  header?: HeaderClasses;
  footer?: FooterClasses;
  body?: BodyClasses;
};
export interface TableColumn<T> {
  header: string;
  name: keyof T;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: boolean;
  editable?: boolean;
  filterable?: boolean;
  render?: (info: CellInfo<T>) => React.ReactNode;
}
export type TableCellProps<T> = Omit<CellProps<T>, "value" | "row" | "column">;
export type TableRowProps<T> = Omit<RowProps<T>, "row" | "columns">;
export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  rowProps?: TableRowProps<T>;
  cellProps?: TableCellProps<T>;
  defaultSortedColumn?: keyof T | null;
  defaultSortDirection?: "asc" | "desc";
  classes?: { container?: ContainerClasses };
  overrideClasses?: { container?: ContainerClasses };
};

const Table = <T extends object>({
  pagination = false,
  defaultSortedColumn = null,
  defaultSortDirection = "asc",
  ...props
}: TableProps<T>) => {
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(
    defaultSortedColumn
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<keyof T, string> | null>(null);

  const totalPages =
    props.itemsPerPage && props.itemsPerPage !== 0
      ? Math.ceil(props.data.length / props.itemsPerPage)
      : 1;

  const handleSort = (columnAccessor: keyof T) => {
    if (sortedColumn === columnAccessor) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnAccessor);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (columnAccessor: keyof T, value: string) => {
    setFilters(
      (prevFilters) =>
        ({
          ...(prevFilters ?? {}),
          [columnAccessor]: value,
        } as any)
    );
  };

  const filteredData = props.data.filter((row) => {
    if (!filters) return true;
    return Object.keys(filters).every((column: string) => {
      const filterValue = (filters as any)[column].toLowerCase();
      return (row as any)[column].toLowerCase().includes(filterValue);
    });
  });

  const paginatedData =
    props.itemsPerPage && props.itemsPerPage !== 0
      ? filteredData.slice(
          (currentPage - 1) * props.itemsPerPage,
          currentPage * props.itemsPerPage
        )
      : filteredData;

  return (
    <div
      className={coalesce(
        props.overrideClasses?.container?.root,
        sc(props.classes?.container?.root, "am_table__container")
      )}
    >
      <div
        className={coalesce(
          props.overrideClasses?.container?.wrapper?.root,
          sc(props.classes?.container?.root, "am_table__wrapper")
        )}
      >
        <table
          className={coalesce(
            props.overrideClasses?.container?.wrapper?.table?.root,
            sc(
              props.classes?.container?.wrapper?.table?.root,
              "am_table__table"
            )
          )}
        >
          <Header
            columns={props.columns}
            onSort={handleSort}
            sortedColumn={sortedColumn}
            sortDirection={sortDirection}
            onFilterChange={handleFilterChange}
          />
          <Body
            data={paginatedData}
            columns={props.columns}
            rowProps={props.rowProps}
            cellProps={props.cellProps}
          />
        </table>
      </div>
      {pagination ? (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            قبل
          </button>
          <span>
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            بعد
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
