"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useGetDetailQuery from "./_query/useGetDetailQuery";
import { Breadcrumbs } from "../../../../components/breadcrumbs";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { ICourse } from "../_interfaces";
import { Circle, CircleCheck, LockOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useEnrollCourseQuery from "./_query/useEnrollCourseQuery";
import useGetAllHistoryQuery from "./_query/useGetAllHistoryQuery";
import Image from "next/image";
import { detailPage } from "../_constants";

const CoursePage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetchData } = useGetDetailQuery(
    params.slug,
  );

  const { dataHistoryLesson } =
    useGetAllHistoryQuery({ limit: 1, filterParams : { course_slug: params.slug }, sortParams : {order: 'DESC', sort: 'updated_at'} });

  function totalLesson(course: ICourse | null) {
    let total: number = 0;
    course?.chapters?.forEach((chapter) => {
      total += chapter.lessons?.length ?? 0;
    });
    return total;
  }

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
    {
      title: data?.name ?? "Rincian Materi",
      titleLink: "Rincian Materi",
      link: detailPage.basePath + detailPage.path + data?.slug,
    },
  ];

  const enrollCourseMutation = useEnrollCourseQuery(() => {
    router.refresh();
      router.push(
        `${params.slug}/${data?.chapters?.length ? data?.chapters[0].slug : ""}/${data?.chapters?.length && data?.chapters[0].lessons ? data?.chapters[0].lessons[0].slug : ""}`,
      );
  });

  const handleClick = () => {
    try {
      if (dataHistoryLesson?.length === 0) {
        enrollCourseMutation.mutate({
          slug: params.slug,
        }); 
      } else {
        router.refresh();
        router.push(
          `${params.slug}/${dataHistoryLesson[0].lesson.chapter?.slug}/${dataHistoryLesson[0].lesson.slug}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFromBeginning = () => {
    router.refresh();
    router.push(
      `${params.slug}/${data?.chapters?.length ? data?.chapters[0].slug : ""}/${data?.chapters?.length && data?.chapters[0].lessons ? data?.chapters[0].lessons[0].slug : ""}`,
    );
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col flex-col-reverse lg:flex-row lg:space-x-8">
          {/* Course Details Section */}
          <div className="mt-4 flex-1 space-y-6">
            <div
              className="ql-editor custom-list"
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            ></div>
            <h2 className="mb-6 text-xl font-semibold">Isi Materi</h2>
            <Accordion type="multiple" className="w-full">
              {data?.chapters?.map((chapter, index) => (
                <AccordionItem key={index}
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
                        {chapter.lessons.map((lesson, subIndex) => (
                          <li
                            key={subIndex}
                            className="border-gray-200 rounded-lg border bg-white p-4 shadow-md"
                          >
                            <Link
                              href={`/course/${data.slug}/${chapter.slug}/${lesson.slug}`}
                              className="flex items-center justify-between"
                            >
                              <LockOpen className="h-6 w-6 text-green-500" />
                              {lesson?.lesson_history && lesson.lesson_history.length > 0 &&
                              lesson.lesson_history[0].is_completed ? (
                                <>
                                  <span className="text-gray-800 flex-grow px-4 line-through	">
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
                        ))}
                      </ul>
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Course Purchase Sidebar */}
          <div className="top-8 flex-shrink-0 lg:w-1/3">
            <div className="sticky top-10">
              <Card className="bg-white shadow-lg">
                <CardHeader className="p-0">
                  <Image
                    width={400} height={200}
                    className="mb-4 w-full rounded-md"
                    src={
                      data?.image_introduce_url ??
                      ""
                    }
                    alt="Course Image"
                  />
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleClick}
                    className="mb-4 w-full text-white"
                  >
                    {dataHistoryLesson?.length > 0
                      ? "Melanjutkan materi"
                      : "Mulai materi sekarang"}
                  </Button>
                    {dataHistoryLesson?.length > 0 && (
                      <Button variant={"outline"}
                      onClick={handleClickFromBeginning}
                      className="mb-4 w-full"
                      >Mulai materi dari awal</Button>
                    )
                    }
                  <ul className="text-gray-600 mt-4 space-y-2 text-sm">
                    <li>✓ {data?.chapters?.length ?? 0} Chapter</li>
                    <li>✓ {totalLesson(data)} video materi</li>
                    <li>
                      ✓ {Math.floor((data?.time || 0) / 60)} jam,{" "}
                      {(data?.time || 0) % 60} menit video materi
                    </li>
                    <li>✓ Full akses, bisa ditonton ulang 24 jam</li>
                    {/* <li>✓ Bisa diakses dimana saja</li> */}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
