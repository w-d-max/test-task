import schema from "./schema.json";
import Form from "./components/Form/Form";
import { Box, Card, CardHeader, Container } from "@mui/material";
import { TSchema } from "./types/schema";
import { blue } from "@mui/material/colors";

function App() {
  const log = (type: string) => console.log.bind(console, type);

  return (
    <Container maxWidth="sm" sx={{ padding: 2 }}>
      <Card variant="outlined" sx={{ boxShadow: 20, borderRadius: 4 }}>
        <CardHeader
          title="JSONschema form"
          sx={{ background: blue["800"], color: "white" }}
          titleTypographyProps={{ fontWeight: 800 }}
        />
        <Box sx={{ padding: 2 }}>
          <Form
            schema={schema as TSchema}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}
          />
        </Box>
      </Card>
    </Container>
  );
}

export default App;
