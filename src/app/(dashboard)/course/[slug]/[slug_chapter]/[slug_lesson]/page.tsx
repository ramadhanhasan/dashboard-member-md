"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs } from "../../../../../../components/breadcrumbs";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../../../../components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleCheck,
  LockOpen,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../components/ui/accordion";
import Link from "next/link";
import { IChapter, ICourse, ILesson } from "../../../_interfaces";
import useGetDetailQueryLesson from "./_query/useGetDetailQueryLesson";
import useGetDetailQuery from "../../_query/useGetDetailQuery";
import { DefaultControls, DefaultUi, Player, Youtube } from "@vime/react";
import { useEffect, useState } from "react";
import { ButtonGroup } from "../../../../../../components/ui/button-group";
import { Button } from "../../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import useCompleteLessonQuery from "./_query/useCompleteLessonQuery";
import { detailPage } from "../../../_constants";
import PlayerComponent from "../../../../../../components/Players";

const CoursePage = ({
  params,
}: {
  params: { slug: string; slug_chapter: string; slug_lesson: string };
}) => {
  const {
    data: dataLesson,
    isLoading,
    refetchData,
  } = useGetDetailQueryLesson(
    params.slug,
    params.slug_chapter,
    params.slug_lesson,
  );

  const [nextLink, setNextLink] = useState<string | null>(null);
  const [prevLink, setPrevLink] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const router = useRouter();
  const { data, isLoading: isLoadingCourse } = useGetDetailQuery(params.slug);

  useEffect(() => {
    let allLessons: { lesson?: string; chapter?: string; link?: string }[] = [];
    data?.chapters?.map((chapter) => {
      chapter?.lessons?.map((lesson) => {
        allLessons.push({
          lesson: lesson.slug,
          chapter: chapter.slug,
          link: `${params.slug}/${chapter.slug}/${lesson.slug}`,
        });
      });
    });

    const index = allLessons.findIndex(
      (lesson) =>
        lesson.lesson === params.slug_lesson &&
        lesson.chapter === params.slug_chapter,
    );

    if (index === 0 && allLessons.length > 1) {
      setNextLink(allLessons[index + 1]?.link ?? null);
    } else if (index === allLessons.length - 1) {
      setPrevLink(allLessons[index - 1]?.link ?? null);
    } else {
      setNextLink(allLessons[index + 1]?.link ?? null);
      setPrevLink(allLessons[index - 1]?.link ?? null);
    }

    setIsComplete(
      dataLesson?.lesson_history && dataLesson?.lesson_history[0]?.is_completed
        ? dataLesson?.lesson_history[0].is_completed
        : false,
    );
  }, [dataLesson, data, params.slug, params.slug_chapter, params.slug_lesson]);

  const completeLessonMutation = useCompleteLessonQuery(() => {
    setIsComplete(true);
  });

  const handleClickComplete = () => {
    try {
      completeLessonMutation.mutate({
        slug: params.slug,
        chapter: params.slug_chapter,
        lesson: params.slug_lesson,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
    {
      title: dataLesson?.name ?? "Rincian Video Materi",
      titleLink: "Rincian Video Materi",
      link: detailPage.basePath + detailPage.path + data?.slug,
    },
  ];

  return (
    <DefaultLayout>
      {!isLoading && !isLoadingCourse && (
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Course Details Section */}
            <div className="mt-4 flex-1 space-y-6">
              <PlayerComponent videoId={dataLesson?.youtube_id ?? ""} />
              <div
                className="ql-editor custom-list"
                dangerouslySetInnerHTML={{
                  __html: dataLesson?.description ?? "",
                }}
              ></div>
              <ButtonGroup className="max-w-[calc(100vw-2rem)] justify-center">
                <Button
                  disabled={!prevLink}
                  onClick={() => {
                    router.refresh();
                    router.push(`/course/${prevLink}`);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <ChevronLeft /> Sebelumnya
                </Button>
                <Button
                  disabled={isComplete}
                  onClick={handleClickComplete}
                  variant="outline"
                  className="w-full"
                >
                  {isComplete ? "Sudah selesai" : "Tandai selesai"}
                </Button>
                <Button
                  disabled={!nextLink}
                  onClick={() => {
                    router.refresh();
                    router.push(`/course/${nextLink}`);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Selanjutnya <ChevronRight />
                </Button>
              </ButtonGroup>
            </div>

            {/* Course Purchase Sidebar */}
            <div className="top-8 mt-5 flex-shrink-0 overflow-auto md:max-h-[calc(100vh-40px)] lg:w-1/3">
              <div className="sticky top-10">
                <Card className="bg-white shadow-lg">
                  <CardHeader className="font-bold">{data?.name}</CardHeader>
                  <CardContent>
                    <Accordion
                      type="multiple"
                      defaultValue={[params.slug_chapter]}
                      className="w-full"
                    >
                      {data?.chapters?.map(
                        (chapter: IChapter, index: number) => (
                          <AccordionItem
                            key={index}
                            value={chapter?.slug ?? ""}
                            className="mb-4 rounded-lg bg-slate-200 pb-2"
                          >
                            <AccordionTrigger className="text-gray-900 px-4 py-2 font-semibold">
                              <p className="text-justify font-medium">
                                {chapter.name} -{" "}
                                <span className="font-small text-gray-500">
                                  {chapter.lessons?.length} lessons
                                </span>
                              </p>
                            </AccordionTrigger>
                            {chapter.lessons && (
                              <AccordionContent className="px-4 py-2">
                                <ul className="text-gray-700 mt-2">
                                  {chapter.lessons.map(
                                    (lesson: ILesson, subIndex) => (
                                      <li
                                        key={lesson.slug}
                                        className={
                                          params.slug_lesson == lesson.slug
                                            ? "border-gray-200 disabled rounded-lg border p-4 shadow-md"
                                            : "border-gray-200 rounded-lg border bg-white p-4 shadow-md"
                                        }
                                      >
                                        <Link
                                          href={`/course/${data.slug}/${chapter.slug}/${lesson.slug}`}
                                          className="flex items-center justify-between"
                                        >
                                          <LockOpen className="h-6 w-6 text-green-500" />
                                          {lesson?.lesson_history &&
                                          lesson?.lesson_history.length > 0 &&
                                          lesson.lesson_history[0]
                                            .is_completed ? (
                                            <>
                                              <span className="text-gray-800 flex-grow px-4">
                                                {lesson.name}
                                              </span>

                                              <CircleCheck className="h-6 w-6 text-green-400" />
                                            </>
                                          ) : (
                                            <>
                                              <span className="text-gray-800 flex-grow px-4 ">
                                                {lesson.name}
                                              </span>
                                              <Circle className="text-gray-400 h-6 w-6" />
                                            </>
                                          )}
                                        </Link>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </AccordionContent>
                            )}
                          </AccordionItem>
                        ),
                      )}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default CoursePage;
