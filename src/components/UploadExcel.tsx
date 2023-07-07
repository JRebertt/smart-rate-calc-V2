"use client";
import { useState } from "react";
import { read, utils } from "xlsx";
import { db } from "../lib/firebase/firebase";
import { writeBatch, doc, collection } from "firebase/firestore";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface RowData {
  [key: string]: any;
}

export function UploadExcel() {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleFileSelect(file: File | undefined) {
    if (file) {
      const reader = new FileReader();

      reader.onload = async function (event) {
        const data = event.target?.result;
        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json<RowData>(worksheet);

        setData(jsonData);
      };

      reader.readAsBinaryString(file);
    }
  }

  async function handleFileInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    handleFileSelect(event.target.files?.[0]);
  }

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleFileSelect(event.dataTransfer.files?.[0]);
  }

  async function uploadData() {
    setLoading(true);
    setSuccess(false);

    const batch = writeBatch(db);

    data.forEach((item) => {
      // with auto-generated ID
      const docRef = doc(collection(db, "products"));
      batch.set(docRef, item);

      // with custom ID
      // const customId = 'my-custom-id';
      // const docRef = doc(db, 'products', customId);
      // batch.set(docRef, item);
    });

    await batch.commit();

    setLoading(false);
    setSuccess(true);
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: "2px dashed grey",
          padding: 2,
          textAlign: "center",
          my: 2,
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <Typography>Arraste e solte o arquivo aqui</Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Ou selecione o arquivo
          <input type="file" onChange={handleFileInputChange} hidden />
        </Button>
      </Box>
      <Button onClick={uploadData} color="primary" disabled={loading}>
        Enviar dados
      </Button>
      {loading && <CircularProgress sx={{ ml: 2 }} />}
      {success && <CheckCircleIcon color="success" sx={{ ml: 2 }} />}

      {data.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}
