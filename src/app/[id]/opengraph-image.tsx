import { ImageResponse } from "next/og";
import { getDoctorProfileInfo } from "@/services/api";

export const runtime = "edge";

export const alt = "Doctor Profile";
export const size = {
  width: 1200,
  height: 1200,
};

export const contentType = "image/jpeg";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://doctors.mediman.life";

  // Fetch doctor data
  const response = await getDoctorProfileInfo(id);
  const doctor = response.success ? response.data.doctor : null;

  if (!doctor) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Doctor not found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const {
    firstName,
    lastName,
    designation,
    profileImage,
    experience,
    languages,
  } = doctor;
  const fullName = `Dr. ${firstName} ${lastName}`;

  // Format languages
  const languagesStr = languages?.join(" | ") || "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        {/* Background Template */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${baseUrl}/doctor_templete.jpg`}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "500px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "100px",
            paddingTop: "50px",
          }}
        >
          {/* Doctor Image */}
          <div
            style={{
              display: "flex",
              width: "300px",
              height: "300px",
              borderRadius: "150px",
              overflow: "hidden",
              border: "8px solid #0066cc",
              marginRight: "50px",
              backgroundColor: "#f0f0f0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImage?.signedUrl || `${baseUrl}/icon.png`}
              alt={fullName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Doctor Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "700px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#000",
                margin: "0 0 10px 0",
                lineHeight: 1.2,
              }}
            >
              {fullName}
            </h1>

            <p
              style={{
                fontSize: "32px",
                color: "#0066cc",
                margin: "0 0 15px 0",
                fontWeight: 600,
              }}
            >
              {designation}
            </p>

            {languagesStr && (
              <p
                style={{
                  fontSize: "24px",
                  color: "#666",
                  margin: "0 0 20px 0",
                }}
              >
                {languagesStr}
              </p>
            )}

            {experience && experience > 0 && (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#e6f0fa",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  alignSelf: "flex-start",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    color: "#0066cc",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {experience}+ years experience
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}