export type Alat = {
  id_alat: string;
  nama_alat: string;
  merek: string;
  tipe: string;
  no_seri: string;
  ruangan: string;
  tahun: Date | number | string;
  tgl_kalibrasi: Date | number | string;
  keterangan: string;
  foto_alat: string;
  createdAt: string | number | Date;
};