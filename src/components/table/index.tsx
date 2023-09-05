import React, { useState } from "react";
import { TableProps } from "types";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import Body from "components/table/body";
import Header from "components/table/header";
import Pagination from "./pagination";
import useSetupTableEffect from "common/hook/use-setup-table";

const Table = <T extends object>({
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
  useSetupTableEffect(props);

  const totalPages =
    props.paginationProps?.itemsPerPage &&
    props.paginationProps?.itemsPerPage !== 0
      ? Math.ceil(props.data.length / props.paginationProps?.itemsPerPage)
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
    props.paginationProps?.itemsPerPage &&
    props.paginationProps?.itemsPerPage !== 0
      ? filteredData.slice(
          (currentPage - 1) * props.paginationProps?.itemsPerPage,
          currentPage * props.paginationProps?.itemsPerPage
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
            idProperty={props.idProperty}
            data={paginatedData}
            columns={props.columns}
            rowProps={props.rowProps}
            cellProps={props.cellProps}
          />
        </table>
      </div>
      {props.paginationProps ? <Pagination {...props.paginationProps} /> : null}
    </div>
  );
};

export default Table;
