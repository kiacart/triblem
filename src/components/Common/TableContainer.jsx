import React, { Fragment, useEffect, useState } from "react";
import { Row, Table, Button, Col } from "reactstrap";
import { Link } from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';
import JobListGlobalFilter from "./GlobalSearchFilter";

// Column Filter
const Filter = ({
  column
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '')}
        onChange={value => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  fill,
  setFill,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);


  return (
    <React.Fragment>
      <Col sm={4}> 
      {
        fill ? 
      <div className="d-flex gap-2 align-items-center">
        <input {...props} value={value} onChange={e => setValue(e.target.value)}  />

        <button type="button" onClick={setFill} className="btn btn-outline-primary ms-1 mb-2 ">
           <i className="fs-5 bx bx-filter-alt"></i>
        </button>
      </div> : 
       <input {...props} value={value} onChange={e => setValue(e.target.value)}  />
      }
      </Col>
    </React.Fragment>
  );
};


const TableContainer = ({
  columns,
  data,
  tableClass,
  theadClass,
  divClassName,
  isBordered,
  isPagination,
  isGlobalFilter,
  paginationWrapper,
  SearchPlaceholder,
  pagination,
  buttonClass,
  buttonName,
  isAddButton,
  phoneBook,
  sortPhone,
  setsortPhone,
  isPhoneBtn,
  handlePhoneClick,
  PhoneBtnName,
  isCustomPageSize,
  handleUserClick,
  isJobListGlobalFilter,
  exportbtn,
  importbtn,
  filter,
  setFilter,
}) => {

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');



  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    // setPageSize,
    getState
  } = table;

  // useEffect(() => {
  //   Number(customPageSize) && setPageSize(Number(customPageSize));
  // }, [customPageSize, setPageSize]);

  return (
    <Fragment>

      <Row className="mb-2">
        {isCustomPageSize && (
          <Col sm={2}>
            <select
              className="form-select pageSize mb-2"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )} 

        {
          isPhoneBtn  && (
            <Col sm={2}>
              <select
                className="form-select pageSize mb-2"
                value={sortPhone}
                onChange={e => {
                  setsortPhone(Number(e.target.value))
                }}
              >
                <option value="" selected disabled>Phone Book</option>
                {phoneBook.map((pageSize, i) => (
                  <option key={i} value={pageSize?.id}>
                    {pageSize?.name}
                  </option>
                ))}
              </select>
            </Col>
        )}

        {isGlobalFilter && <DebouncedInput
          value={globalFilter ?? ''}
          fill={filter}
          setFill={setFilter}
          onChange={value => setGlobalFilter(String(value))}
          className="form-control search-box me-2 mb-2 d-inline-block"
          placeholder={SearchPlaceholder}
        />}

        {isJobListGlobalFilter && <JobListGlobalFilter setGlobalFilter={setGlobalFilter} />} 

        <Col sm={6} className="d-flex justify-content-end align-items-center gap-2"> 

            {importbtn && 
              <div className="text-sm-end gap-2">
                <Button type="button" className={`${buttonClass} d-flex align-items-center gap-1 justify-content-center`} onClick={{}}>
                <span>
                  <i className="bx bx-import"></i> 
                </span>
                <span className="d-none d-md-block">
                  Import
                </span>
                </Button> 
              </div>
            }

           {exportbtn && 
              <div className="text-sm-end gap-2">
                <Button type="button" className={`${buttonClass} d-flex align-items-center gap-1 justify-content-center`} onClick={{}}>
                <span>
                  <i className="bx bx-export "></i> 
                </span>
                <span className="d-none d-md-block">
                  Export
                </span>
                </Button>
              </div>
            }

          {isAddButton && 
            <div className="text-sm-end gap-2">
              <Button type="button" className={`${buttonClass} d-flex align-items-center gap-1 justify-content-center`} onClick={handleUserClick}>
                <span>
                <i className="mdi mdi-plus"></i> 
                </span>
                <span className="d-none d-md-block">
                 {buttonName}
                </span>
                </Button>
            </div>
          }

            {isPhoneBtn && 
              <div className="text-sm-end gap-2">
                <Button type="button" className={`${buttonClass} d-flex align-items-center gap-1 justify-content-center`} onClick={handlePhoneClick}>
                  <span>
                  <i className="mdi mdi-contacts "></i> 
                  </span>
                  <span className="d-none d-md-block">
                    {PhoneBtnName}
                  </span>
                 </Button>
              </div>
            } 

        </Col>
      </Row>

      <div className={divClassName ? divClassName : "table-responsive"}>
        <Table hover className={tableClass} bordered={isBordered}>
          <thead className={theadClass}>
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className={`${header.column.columnDef.enableSorting ? "sorting sorting_desc" : ""}`}>
                      {header.isPlaceholder ? null : (
                        <React.Fragment>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {
                              {
                                asc: '',
                                desc: '',
                              }
                              [header.column.getIsSorted()] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </React.Fragment>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>


      {
        isPagination && (
          <Row>
            <Col sm={12} md={5}>
              <div className="dataTables_info">Showing {getState().pagination.pageSize} of {data.length} Results</div>
            </Col>
            <Col sm={12} md={7}>
              <div className={paginationWrapper}>
                <ul className={pagination}>
                  <li className={`paginate_button page-item previous ${!getCanPreviousPage() ? "disabled" : ""}`}>
                    <Link to="#" className="page-link" onClick={previousPage}><i className="mdi mdi-chevron-left"></i></Link>
                  </li>
                  {getPageOptions().map((item, key) => (
                    <li key={key} className={`paginate_button page-item ${getState().pagination.pageIndex === item ? "active" : ""}`}>
                      <Link to="#" className="page-link" onClick={() => setPageIndex(item)}>{item + 1}</Link>
                    </li>
                  ))}
                  <li className={`paginate_button page-item next ${!getCanNextPage() ? "disabled" : ""}`}>
                    <Link to="#" className="page-link" onClick={nextPage}><i className="mdi mdi-chevron-right"></i></Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        )
      }
    </Fragment>
  );
};

export default TableContainer;