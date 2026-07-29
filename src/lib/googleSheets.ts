import { SignJWT, importPKCS8 } from "jose";

async function getGoogleAccessToken(): Promise<string> {
  const privateKey = await importPKCS8(
    process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    "RS256",
  );

  const jwt = await new SignJWT({
    scope: "https://www.googleapis.com/auth/spreadsheets",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(process.env.GOOGLE_CLIENT_EMAIL!)
    .setSubject(process.env.GOOGLE_CLIENT_EMAIL!)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) throw new Error("Failed to get Google access token");
  const data = await res.json();
  return data.access_token;
}

export async function appendToSheet(range: string, row: (string | number)[]) {
  const accessToken = await getGoogleAccessToken();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    },
  );

  if (!res.ok) throw new Error(`Sheets append failed: ${await res.text()}`);
}
