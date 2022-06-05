import { idID as coreIdID } from "@mui/material/locale";
import { getGridLocalization } from "@mui/x-data-grid/utils/getGridLocalization";
import { GridLocaleText } from "types/theme/gridLocaleText";

const iDIDLocaleText: GridLocaleText = {
  // Root
  noRowsLabel: "Tidak ada baris",
  noResultsOverlayLabel: "Tidak ada hasil yang ditemukan.",
  errorOverlayDefaultLabel: "Terjadi kesalahan.",

  // Density selector toolbar button text
  toolbarDensity: "Kepadatan",
  toolbarDensityLabel: "Kepadatan",
  toolbarDensityCompact: "Compact",
  toolbarDensityStandard: "Kompak",
  toolbarDensityComfortable: "Nyaman",

  // Columns selector toolbar button text
  toolbarColumns: "Kolom",
  toolbarColumnsLabel: "Pilih kolom",

  // Filters toolbar button text
  toolbarFilters: "Filter",
  toolbarFiltersLabel: "Tampilkan filter",
  toolbarFiltersTooltipHide: "Hide filters",
  toolbarFiltersTooltipShow: "Tampilkan filter",
  toolbarFiltersTooltipActive: (count: any) =>
    count !== 1 ? `${count} filter aktif` : `${count} filter aktif`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "Mencari...",
  toolbarQuickFilterLabel: "Mencari",
  toolbarQuickFilterDeleteIconLabel: "Jernih",

  // Export selector toolbar button text
  toolbarExport: "Ekspor",
  toolbarExportLabel: "Ekspor",
  toolbarExportCSV: "Unduh sebagai CSV",
  toolbarExportPrint: "Mencetak",
  toolbarExportExcel: "Unduh sebagai Excel",

  // Columns panel text
  columnsPanelTextFieldLabel: "Temukan kolom",
  columnsPanelTextFieldPlaceholder: "Judul kolom",
  columnsPanelDragIconLabel: "Susun ulang kolom",
  columnsPanelShowAllButton: "Tunjukkan semua",
  columnsPanelHideAllButton: "Sembunyikan semua",

  // Filter panel text
  filterPanelAddFilter: "Tambahkan filter",
  filterPanelDeleteIconLabel: "Menghapus",
  filterPanelLinkOperator: "Operator logika",
  filterPanelOperators: "Operator", // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: "Dan",
  filterPanelOperatorOr: "Atau",
  filterPanelColumns: "Kolom",
  filterPanelInputLabel: "Nilai",
  filterPanelInputPlaceholder: "Nilai filter",

  // Filter operators text
  filterOperatorContains: "mengandung",
  filterOperatorEquals: "sama dengan",
  filterOperatorStartsWith: "dimulai dengan",
  filterOperatorEndsWith: "berakhir dengan",
  filterOperatorIs: "adalah",
  filterOperatorNot: "tidak",
  filterOperatorAfter: "adalah setelah",
  filterOperatorOnOrAfter: "sedang atau setelah",
  filterOperatorBefore: "adalah sebelum",
  filterOperatorOnOrBefore: "sedang atau sebelum",
  filterOperatorIsEmpty: "kosong",
  filterOperatorIsNotEmpty: "tidak kosong",
  filterOperatorIsAnyOf: "adalah salah satu dari",

  // Filter values text
  filterValueAny: "setiap",
  filterValueTrue: "BENAR",
  filterValueFalse: "Salah",

  // Column menu text
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Tampilkan kolom",
  columnMenuFilter: "Saring",
  columnMenuHideColumn: "Bersembunyi",
  columnMenuUnsort: "Batalkan pengurutan",
  columnMenuSortAsc: "Urutkan menurut ASC",
  columnMenuSortDesc: "Urutkan menurut DESC",

  // Column header text
  columnHeaderFiltersTooltipActive: (count: any) =>
    count !== 1 ? `${count} filter aktif` : `${count} filter aktif`,
  columnHeaderFiltersLabel: "Tampilkan filter",
  columnHeaderSortIconLabel: "Menyortir",

  // Rows selected footer text
  footerRowSelected: (count: any) =>
    count !== 1
      ? `${count.toLocaleString()} baris dipilih`
      : `${count.toLocaleString()} baris dipilih`,

  // Total row amount footer text
  footerTotalRows: "Total Baris:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount: any, totalCount: any) =>
    `${visibleCount.toLocaleString()} dari ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Pilihan kotak centang",
  checkboxSelectionSelectAllRows: "Pilih semua baris",
  checkboxSelectionUnselectAllRows: "Batalkan pilihan semua baris",
  checkboxSelectionSelectRow: "Pilih baris",
  checkboxSelectionUnselectRow: "Batalkan pilihan baris",

  // Boolean cell text
  booleanCellTrueLabel: "Ya",
  booleanCellFalseLabel: "Tidak",

  // Actions cell more text
  actionsCellMore: "lagi",

  // Column pinning text
  pinToLeft: "Sematkan ke kiri",
  pinToRight: "Sematkan ke kanan",
  unpin: "Membuka peniti",

  // Tree Data
  treeDataGroupingHeaderName: "Kelompok",
  treeDataExpand: "melihat anak",
  treeDataCollapse: "melihat anak",

  // Grouping columns
  groupingColumnHeaderName: "Kelompok",
  groupColumn: (name: any) => `Kelompokkan menurut ${name}`,
  unGroupColumn: (name: any) => `Berhenti mengelompokkan menurut ${name}`,

  // Master/detail
  expandDetailPanel: "Mengembangkan",
  collapseDetailPanel: "Jatuh",

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: "Pengurutan ulang baris",
};

export const GRID_DEFAULT_LOCALE_TEXT = getGridLocalization(
  iDIDLocaleText,
  coreIdID
);
