import React, { useRef } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const DEVELOPER_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPE = "https://www.googleapis.com/auth/drive.readonly";

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

export default function GoogleDrivePicker({ onPick, disabled }) {
  const tokenClient = useRef(null);

  const openPicker = async () => {
    await loadScript("https://apis.google.com/js/api.js");
    await loadScript("https://accounts.google.com/gsi/client");

    // 1. Request an access token with GIS
    if (!tokenClient.current) {
      /* global google */
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPE,
        callback: async (response) => {
          if (response && response.access_token) {
            createPicker(response.access_token);
          }
        },
      });
    }

    // Request access token (prompts user)
    tokenClient.current.requestAccessToken();
  };

  function createPicker(oauthToken) {
    window.gapi.load("picker", { callback: () => {
      const view = new window.google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(false)
        .setMimeTypes(
          "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
        )
        .setMode(window.google.picker.DocsViewMode.LIST);

      const picker = new window.google.picker.PickerBuilder()
        .addView(view)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(DEVELOPER_KEY)
        .setCallback(async (data) => {
          if (data.action === window.google.picker.Action.PICKED) {
            const doc = data.docs[0];
            const fileId = doc.id;
            const fileName = doc.name;
            const mimeType = doc.mimeType;

            // Download as blob
            const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
            const blobRes = await fetch(downloadUrl, {
              headers: { Authorization: "Bearer " + oauthToken },
            });
            const blob = await blobRes.blob();
            const file = new File([blob], fileName, { type: mimeType });
            onPick(file);
          }
        })
        .setTitle("Select Resume from Google Drive")
        .build();

      picker.setVisible(true);
    }});
  }

  return (
    <button
      type="button"
      onClick={openPicker}
      disabled={disabled}
      className={`w-full px-4 py-2 sm:px-6 sm:py-3 mt-2 rounded-lg font-semibold text-white transition-all duration-300 text-sm sm:text-base ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-sm hover:shadow-md"
      }`}
    >
      Select from Google Drive
    </button>
  );
}
