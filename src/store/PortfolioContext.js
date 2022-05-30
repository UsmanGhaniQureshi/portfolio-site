import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
const PortfolioContext = createContext({
  loading: false,
  personalInfo: {},
  education: [],
  hobbies: [],
  work: [],
  highlights: [],
  interests: [],
  projects: [],
  programmingSkills: [],
  typeWriterStrings: [],
});

const PortfolioContextProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [education, setEducation] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [interests, setInterests] = useState([]);
  const [work, setWork] = useState([]);
  const [projects, setProjects] = useState([]);
  const [programmingSkills, setProgrammingSkills] = useState([]);
  const [typeWriterStrings, setTypeWriterStrings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching Hobbies
    (async () => {
      const q = query(collection(db, "hobbies"));
      const hobbiesDoc = await getDocs(q);

      const data = [];
      hobbiesDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setHobbies(data);
    })();

    // Fetching About Highlights
    (async () => {
      const q = query(collection(db, "highlights"));
      const highlightsDoc = await getDocs(q);

      const data = [];
      highlightsDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setHighlights(data);
    })();

    // AutoType Strings

    (async () => {
      const q = query(collection(db, "autotypestrings"));
      const autoTypeStringsDoc = await getDocs(q);

      const data = [];
      autoTypeStringsDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setTypeWriterStrings(data);
    })();

    // Education

    (async () => {
      const q = query(collection(db, "education"));
      const educationDoc = await getDocs(q);

      const data = [];
      educationDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setEducation(data);
    })();

    // Programming

    (async () => {
      const q = query(collection(db, "programming"));
      const programmingDoc = await getDocs(q);

      const data = [];
      programmingDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setProgrammingSkills(data);
    })();
    // Work Histroy
    (async () => {
      const q = query(collection(db, "work"));
      const workDoc = await getDocs(q);

      const data = [];
      workDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setWork(data);
    })();
    //Projects
    (async () => {
      const q = query(collection(db, "projects"));
      const projectsDoc = await getDocs(q);

      const data = [];
      projectsDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setProjects(data);
    })();
    // Interests
    (async () => {
      const q = query(collection(db, "interests"));
      const interestsDoc = await getDocs(q);

      const data = [];
      interestsDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setInterests(data);
    })();

    // PersonalInfo

    (async () => {
      const q = query(doc(db, "personal_info", "hoxRlFaed0fc7w2rZW80"));
      const personalDoc = await getDoc(q);

      if (personalDoc.exists()) {
        setPersonalInfo(personalDoc.data());
      }
      setLoading(false);
    })();
  }, []);
  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        loading,
        education,
        programmingSkills,
        work,
        projects,
        hobbies,
        interests,
        highlights,
        typeWriterStrings,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;

export function usePortfolio() {
  return useContext(PortfolioContext);
}
