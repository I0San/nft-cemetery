import { ConnectKitProvider } from "connectkit"

export const ConnectKitCustomProvider = ({ children }) => {
  return (
    <ConnectKitProvider
      customTheme={{
        "--ck-connectbutton-background": "linear-gradient(87.01deg, #2b2356 2.48%, #4f286b 146.32%)",
        "--ck-connectbutton-hover-background": "linear-gradient(87.01deg, #2b2356 2.48%, #4f286b 146.32%)",
        "--ck-spinner-color": "#257e90",
        "--ck-qr-border-color": "rgba(255, 255, 255, 0.1)",
        "--ck-overlay-background": "rgba(0, 0, 0, 0.55)",
        "--ck-body-background": "#20202d",
        "--ck-body-background-secondary": "#20202d",
        "--ck-body-background-tertiary": "#20202d",
        "--ck-border-radius": "20px",
        // "--ck-modal-box-shadow": "0px 4px 20px rgba(0, 0, 0, 0.7)",
        "--ck-modal-box-shadow": "inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.7)",
        "--ck-overlay-backdrop-filter": "drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.7))",

        "--ck-primary-button-background": "#20202d",
        "--ck-primary-button-box-shadow": "0px 0px 0px 1px #ffffff inset",
        "--ck-primary-button-border-radius": "12px",
        "--ck-primary-button-hover-background": "linear-gradient(87.01deg, #2b2356 2.48%, #4f286b 146.32%)",
        "--ck-primary-button-hover-box-shadow": "none",
        "--ck-primary-button-hover-color": "#111117",
        "--ck-primary-button-font-weight": "500",

        "--ck-secondary-button-background": "linear-gradient(87.01deg, #2b2356 2.48%, #4f286b 146.32%)",
        "--ck-secondary-button-border-radius": "12px",
        "--ck-secondary-button-hover-background": "linear-gradient(87.01deg, #2b2356 2.48%, #4f286b 146.32%)",
        "--ck-secondary-button-color": "#FFFFF",
        "--ck-secondary-button-hover-color": "whitesmoke",
        "--ck-secondary-button-font-weight": "500",
      }}
    >
      {children}
    </ConnectKitProvider>
  )
}
