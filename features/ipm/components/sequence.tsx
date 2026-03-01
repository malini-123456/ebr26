export type IpmRow = {
  // keep for actions/ids if needed
  id_ipm: number;

  // Alat fields (flattened)
  nama_alat: string;
  merek: string;
  tipe: string;
  no_seri: string;
  ruangan: string;

  // Ipm fields
  createdAt: string | number | Date;
  hasil: string;
  teknisi: string;
  setting: string;
  terukur: string;
};