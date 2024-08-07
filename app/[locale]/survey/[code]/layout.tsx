import BottomBar from "./components/BottomBar";
import TopBar from "./components/TopBar";
import LayoutSurvey from "./components/layouts/LayoutSurvey";
import { SurveyFlowProvider } from "./context/SurveyFlowContext";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SurveyFlowProvider>
      <div className="h-dvh w-dvw">
        <LayoutSurvey topBar={<TopBar />} bottomBar={<BottomBar />}>
          {children}
        </LayoutSurvey>
      </div>
    </SurveyFlowProvider>
  );
};

export default Layout;
