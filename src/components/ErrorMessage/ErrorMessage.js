import { Alert } from "antd";

function ErrorMessage() {
  const text = "Нет сети ;(";

  return <Alert message={text} type="error" style={{ marginBottom: "10px" }} />;
}

export default ErrorMessage;
