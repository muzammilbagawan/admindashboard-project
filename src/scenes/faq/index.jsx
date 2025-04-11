import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Q: What information is displayed on the dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The dashboard provides a summary of key metrics and information relevant to your business, such as [list key metrics displayed, e.g., total sales, recent activities, outstanding invoices].
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Q: How do I add a new contact?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Describe the process for adding a new contact in the "Contacts" section. This would involve steps within the Contacts component.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Q: How do I use the calendar?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The calendar allows you to view, create, and manage events. You can add new events by [explain the process of adding events].
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Q: How do I generate an invoice?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Explain the process of generating an invoice in the "Invoices" section. This depends on the functionality of your Invoices component.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Q: Can I filter or sort the data in the team section?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          This depends on your Team component's functionality. If filtering and sorting are available, describe how the user can do it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;