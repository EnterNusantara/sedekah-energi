import BaseLayoutKnowledge from "@/component/BaseLayoutKnowledge";
import Quiz from "@/component/Quiz";
import { getKnowledgeBaseById } from "@/services/knowledgeBase";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ScrollSpy from "react-scrollspy-navigation";

export async function getServerSideProps({ params }) {
  console.log("======>", params);
  const knowledgesSLug = await getKnowledgeBaseById(params.id);
  console.log(knowledgesSLug);

  return {
    props: {
      knowledges: knowledgesSLug,
    },
  };
}

const KnowledgeBasePage = ({ knowledges }) => {
  console.log(knowledges);
  const router = useRouter();

  const [_, setListActive] = useState("1");

  const [isMobileLocal, setIsMobileLocal] = useState(false);
  useEffect(() => {
    setIsMobileLocal(isMobile);

    if (!knowledges) {
      router.push("/404");
    }
  }, [isMobile]);

  const handleClickList = (id) => {
    setListActive(id);
    var element = document.getElementById(`${id}`);
    var headerOffset = isMobileLocal ? 650 : 80;
    var elementPosition = element.getBoundingClientRect().top;
    const pageY = window.scrollY || window.pageYOffset;
    var offsetPosition = elementPosition + pageY - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setIsListExpanded(!isListExpanded);
  };

  const [isListExpanded, setIsListExpanded] = useState(false);

  const toggleAccordionList = () => {
    setIsListExpanded(!isListExpanded);
  };

  return (
    <>
      <Head>
        <title>Sedekah Energi - {knowledges?.title}</title>
        <meta name="description" content={knowledges?.subtitle} />
        <meta
          property="og:title"
          content={`Sedekah Energi - ${knowledges?.title}`}
        />
        <meta property="og:description" content={knowledges?.subtitle} />
        <link
          rel="canonical"
          href={`https://sedekahenergi.mosaic-indonesia.com/${knowledges?.slug}`}
        />
      </Head>
      <BaseLayoutKnowledge
        page={knowledges?.page || "kbGreen"}
        headingColor={
          knowledges?.headingColor?.isCustom
            ? knowledges?.headingColor?.custom
            : knowledges?.headingColor?.value
        }
        jumbotronContent={{
          title: knowledges?.title || "Knowledge Hub",
          subtitle: knowledges?.subtitle || "",
          imgHeader: knowledges?.headingImageUrl
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${knowledges?.headingImageUrl}`
            : null,
        }}
      >
        <div className="knowledge-base-page">
          <div className="container">
            <div className="row knowledge-base-section">
              <>
                <div className="col-lg-4 col-12 wrapper-mview">
                  {!isMobileLocal ? (
                    <div className="card-overview">
                      <p className="title p-0 m-0">Daftar Isi</p>
                      <ScrollSpy activeClass="active">
                        {knowledges?.sections?.map((item, index) => {
                          return (
                            <a
                              href={`#${item.sectionTitle}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleClickList(item.sectionTitle);
                              }}
                              className={clsx({
                                "point-text text-decoration-none": true,
                              })}
                            >
                              {item.sectionTitle}
                              <span>{index + 1}</span>
                            </a>
                          );
                        })}
                      </ScrollSpy>
                    </div>
                  ) : (
                    <div className="accordion-container">
                      <div
                        className="accordion-header"
                        onClick={toggleAccordionList}
                      >
                        <p className="title m-0 p-0">Daftar Isi</p>
                        <span
                          className={`accordion-arrow ${
                            isListExpanded ? "expanded" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              d="M20.367 9.53062L12.867 17.0306C12.7973 17.1003 12.7146 17.1557 12.6236 17.1934C12.5325 17.2312 12.4349 17.2506 12.3364 17.2506C12.2378 17.2506 12.1402 17.2312 12.0491 17.1934C11.9581 17.1557 11.8754 17.1003 11.8057 17.0306L4.30573 9.53062C4.165 9.38988 4.08594 9.19901 4.08594 8.99999C4.08594 8.80097 4.165 8.61009 4.30573 8.46936C4.44646 8.32863 4.63733 8.24957 4.83635 8.24957C5.03538 8.24957 5.22625 8.32863 5.36698 8.46936L12.3364 15.4397L19.3057 8.46936C19.3754 8.39968 19.4581 8.34441 19.5492 8.30669C19.6402 8.26898 19.7378 8.24957 19.8364 8.24957C19.9349 8.24957 20.0325 8.26898 20.1235 8.30669C20.2146 8.34441 20.2973 8.39968 20.367 8.46936C20.4367 8.53905 20.4919 8.62177 20.5296 8.71282C20.5674 8.80386 20.5868 8.90144 20.5868 8.99999C20.5868 9.09854 20.5674 9.19612 20.5296 9.28716C20.4919 9.37821 20.4367 9.46093 20.367 9.53062Z"
                              fill="#036A71"
                            />
                          </svg>
                        </span>
                      </div>
                      <ScrollSpy activeClass="active">
                        <>
                          {isListExpanded && (
                            <div className="accordion-body">
                              {knowledges?.sections?.map((item, index) => {
                                return (
                                  <a
                                    href={`#${item.sectionTitle}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleClickList(item.sectionTitle);
                                    }}
                                    className={clsx({
                                      "point-text text-decoration-none": true,
                                    })}
                                  >
                                    {item.sectionTitle}
                                    <span>{index + 1}</span>
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </>
                      </ScrollSpy>
                    </div>
                  )}
                </div>

                <div className="col-lg-8 col-12 wrapper-content-section">
                  {knowledges?.sections?.map((item, index) => {
                    return (
                      <AccordionContent
                        item={item.content}
                        title={item.sectionTitle}
                        index={index + 1}
                      />
                    );
                  })}
                </div>
              </>
            </div>
          </div>
        </div>
        <Quiz />
      </BaseLayoutKnowledge>
    </>
  );
};

export default KnowledgeBasePage;

const AccordionContent = ({ item, index, title }) => {
  const [activeIndex, setActiveIndex] = useState([]);
  const toggleAccordion = (index) => {
    if (activeIndex.includes(index)) {
      setActiveIndex((val) => val.filter((i) => i !== index));
      return;
    }
    setActiveIndex([...activeIndex, index]);
  };

  return (
    <section className="content-section" id={title}>
      <div className="section-wrapper row  align-items-center">
        <div className="col-2 col-lg-1 pr-0 pl-3">
          <p className="id">{index}</p>
        </div>
        <div className="col-10 col-lg-11 pl-2 pl-sm-0">
          <p className="section-title">{title}</p>
        </div>
      </div>

      {item.map((content) => {
        return (
          <div className="accordion">
            <div
              className={clsx({
                "accordion-item": true,
                expanded: activeIndex.includes(`${index}-${content.title}`),
              })}
              id={content.title.replace(/\s+/g, "")}
            >
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    activeIndex !== index ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => toggleAccordion(`${index}-${content.title}`)}
                  aria-expanded={activeIndex.includes(
                    `${index}-${content.title}`
                  )}
                >
                  {content.title}
                </button>
              </h2>
              <div
                id={`asd-content`}
                className={`accordion-collapse collapse ${
                  activeIndex.includes(`${index}-${content.title}`)
                    ? "show"
                    : ""
                }`}
                aria-labelledby={content.title.replace(/\s+/g, "")}
              >
                <div className="accordion-body">
                  <div
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  ></div>
                  {content?.downloadButtons &&
                    content?.downloadButtons?.map((value) => {
                      return (
                        <a
                          href={value?.url}
                          className="btn btn-success rounded-5 my-3 btn-download d-flex justify-content-center align-items-center w-50"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {value?.text}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
