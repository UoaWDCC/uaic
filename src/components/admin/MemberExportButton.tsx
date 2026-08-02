"use client";

import { Button, useDocumentDrawer } from "@payloadcms/ui";
import { useEffect } from "react";
// Not part of @payloadcms/plugin-import-export's public exports (".", "./types",
// "./rsc") — this is the same context its own ExportListMenuItem uses internally
// to tell the export drawer which collection it's exporting, so the drawer's
// "Columns to Export"/"Sort By"/Preview fields default to Member instead of
// coming up empty. Pinned to plugin-import-export@3.33.0's file layout; if that
// package is upgraded and this import starts failing, check whether the plugin
// added a public way to open/pre-fill an export drawer for a given collection.
import { useImportExport } from "../../../node_modules/@payloadcms/plugin-import-export/dist/components/ImportExportProvider/index.js";

export const MemberExportButton = () => {
  const [DocumentDrawer, , { openDrawer }] = useDocumentDrawer({ collectionSlug: "exports" });
  const { setCollection } = useImportExport();

  useEffect(() => {
    setCollection("member");
  }, [setCollection]);

  return (
    <>
      <Button onClick={openDrawer} size="medium" type="button">
        Export
      </Button>
      <DocumentDrawer />
    </>
  );
};
