import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqSection = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "20px" }}>
        FAQ
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What is cryptocurrency?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Cryptocurrency is a digital payment system that doesn't rely on
            banks to verify transactions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* Repeat for other FAQs */}
    </div>
  );
};

export default FaqSection;
