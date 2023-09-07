import { Column, TableOptions } from "types";
export default function createAtoms<T>(initialOptions: TableOptions<T>): {
    atom: {
        columnsMap: import("jotai").PrimitiveAtom<Record<string, Column<T>>> & {
            init: Record<string, Column<T>>;
        };
        idProperty: import("jotai").PrimitiveAtom<string> & {
            init: string;
        };
        columns: import("jotai").PrimitiveAtom<(import("jotai").PrimitiveAtom<Column<T>> & {
            init: Column<T>;
        })[]> & {
            init: (import("jotai").PrimitiveAtom<Column<T>> & {
                init: Column<T>;
            })[];
        };
        data: import("jotai").PrimitiveAtom<T[]> & {
            init: T[];
        };
        color: import("jotai").PrimitiveAtom<string | undefined> & {
            init: string | undefined;
        };
        header: {
            selection: import("jotai").PrimitiveAtom<boolean> & {
                init: boolean;
            };
            selected: import("jotai").PrimitiveAtom<Record<string, any>> & {
                init: Record<string, any>;
            };
            onSort: ((columnAccessor: keyof T) => void) | undefined;
            cell: {
                onClick: ((info: import("types").HeaderCell<T>, updateHeaderCell?: import("types").UpdateHeaderCellCallback<T> | undefined) => void) | undefined;
                onResize: ((e: any, info: import("types").ColumnResize) => void) | undefined;
                width: import("jotai").PrimitiveAtom<number | undefined> & {
                    init: number | undefined;
                };
            };
        };
        sort: {
            defaultSortedColumn: import("jotai").PrimitiveAtom<keyof T | null | undefined> & {
                init: keyof T | null | undefined;
            };
            defaultSortDirection: import("jotai").PrimitiveAtom<"asc" | "desc"> & {
                init: "asc" | "desc";
            };
        };
        row: {
            editable: import("jotai").PrimitiveAtom<boolean> & {
                init: boolean;
            };
            selected: import("jotai").PrimitiveAtom<Record<string, T>> & {
                init: Record<string, T>;
            };
            selection: import("jotai").PrimitiveAtom<boolean> & {
                init: boolean;
            };
            onClick: ((info: import("types").Row<T>, updateRow?: import("types").UpdateRowCallback<T> | undefined) => void) | undefined;
            classes: {
                root: import("jotai").PrimitiveAtom<string | undefined> & {
                    init: string | undefined;
                };
            };
            overrideClasses: {
                root: import("jotai").PrimitiveAtom<string | undefined> & {
                    init: string | undefined;
                };
            };
            indexing: {
                enabled: import("jotai").PrimitiveAtom<boolean | undefined> & {
                    init: boolean | undefined;
                };
                label: import("jotai").PrimitiveAtom<string | undefined> & {
                    init: string | undefined;
                };
            };
        };
        cell: {
            editable: import("jotai").PrimitiveAtom<boolean> & {
                init: boolean;
            };
            selection: import("jotai").PrimitiveAtom<boolean> & {
                init: boolean;
            };
            selected: import("jotai").PrimitiveAtom<Record<string, any>> & {
                init: Record<string, any>;
            };
            onClick: ((info: import("types").Cell<T>, updateCell?: import("types").UpdateCellCallback<T> | undefined) => void) | undefined;
            onChange: ((info: import("types").EditableCell<T>, value: any) => void) | undefined;
        };
        pagination: {
            enabled: import("jotai").PrimitiveAtom<boolean> & {
                init: boolean;
            };
            totalPages: import("jotai").PrimitiveAtom<number | undefined> & {
                init: number | undefined;
            };
            currentPage: import("jotai").PrimitiveAtom<number | undefined> & {
                init: number | undefined;
            };
            itemsPerPage: import("jotai").PrimitiveAtom<number | undefined> & {
                init: number | undefined;
            };
        };
        classes: {
            body: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            row: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            pagination: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            headerRow: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            headerCell: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                    resizeHandle: {
                        root: import("jotai").PrimitiveAtom<string | undefined> & {
                            init: string | undefined;
                        };
                    };
                    content: {
                        root: import("jotai").PrimitiveAtom<string | undefined> & {
                            init: string | undefined;
                        };
                    };
                    sortBtn: {
                        root: import("jotai").PrimitiveAtom<string | undefined> & {
                            init: string | undefined;
                        };
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                    resizeHandle: {
                        root: import("jotai").PrimitiveAtom<string | undefined> & {
                            init: string | undefined;
                        };
                    };
                    content: {
                        root: import("jotai").PrimitiveAtom<string | undefined> & {
                            init: string | undefined;
                        };
                    };
                    sortBtn: {
                        root: import("jotai").PrimitiveAtom<string | undefined> & {
                            init: string | undefined;
                        };
                    };
                };
            };
            cell: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            header: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            table: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            container: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
            wrapper: {
                classes: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
                overrideClasses: {
                    root: import("jotai").PrimitiveAtom<string | undefined> & {
                        init: string | undefined;
                    };
                };
            };
        };
    };
    store: {
        get: <Value>(atom: import("jotai").Atom<Value>) => Value;
        set: <Value_1, Args extends unknown[], Result>(atom: import("jotai").WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
        sub: (atom: import("jotai").Atom<unknown>, listener: () => void) => () => void;
        dev_subscribe_store: (l: (action: {
            type: "write";
            flushed: Set<import("jotai").Atom<unknown>>;
        } | {
            type: "async-write";
            flushed: Set<import("jotai").Atom<unknown>>;
        } | {
            type: "sub";
            flushed: Set<import("jotai").Atom<unknown>>;
        } | {
            type: "unsub";
        } | {
            type: "restore";
            flushed: Set<import("jotai").Atom<unknown>>;
        }) => void, rev: 2) => () => void;
        dev_get_mounted_atoms: () => IterableIterator<import("jotai").Atom<unknown>>;
        dev_get_atom_state: (a: import("jotai").Atom<unknown>) => ({
            d: Map<import("jotai").Atom<unknown>, any & ({
                e: unknown;
            } | {
                v: unknown;
            })>;
        } & ({
            e: unknown;
        } | {
            v: unknown;
        })) | undefined;
        dev_get_mounted: (a: import("jotai").Atom<unknown>) => {
            l: Set<() => void>;
            t: Set<import("jotai").Atom<unknown>>;
            u?: (() => void) | undefined;
        } | undefined;
        dev_restore_atoms: (values: Iterable<readonly [import("jotai").Atom<unknown>, unknown]>) => void;
    } | {
        get: <Value_2>(atom: import("jotai").Atom<Value_2>) => Value_2;
        set: <Value_1_1, Args_1 extends unknown[], Result_1>(atom: import("jotai").WritableAtom<Value_1_1, Args_1, Result_1>, ...args: Args_1) => Result_1;
        sub: (atom: import("jotai").Atom<unknown>, listener: () => void) => () => void;
        dev_subscribe_store?: undefined;
        dev_get_mounted_atoms?: undefined;
        dev_get_atom_state?: undefined;
        dev_get_mounted?: undefined;
        dev_restore_atoms?: undefined;
    };
};
