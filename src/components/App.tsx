import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";

function App() {
  // ================== STATE =========
  const [searchText, setSearchText] = useState("");
  const deBouncedValue = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(deBouncedValue);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  // ================= DERIVED STATE ===========================
  const jobItemsSliced = jobItems?.slice(0, 7) || [];
  const totalNumberOfResults = jobItems?.length || 0;
  // ================ EVENT HANDLERS / ACTION ========
  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>
          <JobList isLoading={isLoading} jobItems={jobItemsSliced} />
          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
