"use client";

import { BookCheck, Presentation, TableOfContents } from "lucide-react";
import { ICourse } from "../../app/(dashboard)/course/_interfaces";
import { Button } from "../ui/button";
import { Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Course = ({ courses }: { courses: ICourse[] }) => {
  const router = useRouter();
  function totalLesson(course : ICourse) {
    let total : number = 0;
    course.chapters?.forEach((chapter) => {
      total += chapter.lessons?.length ?? 0
    })
    return total
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course: ICourse) => (
        <a key={course.id}
          onClick={() => {
            router.push(`course/${course.slug}`)
          }}
          className="max-w-sm transform cursor-pointer overflow-hidden rounded bg-white text-left shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <Image 
            width={400} height={200}
            className="w-full"
            src={
              course.image_introduce_url ??
              "https://via.placeholder.com/400x200"
            }
            alt={course.name}
          />
          <div className="px-6 pb-2 pt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700">
              {course.category}
            </span>
            {/* <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700">
            {course.time} minutes
          </span> */}
          </div>
          <div className="px-6 py-1">
            <p className="truncate-2 mb-2 text-xl font-bold">{course.name}</p>
            <div className="mb-2 mt-2 flex items-center">
              <div className="flex items-center">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
            {/* <div
              className="ql-editor truncate-3 text-gray-700 text-base"
              dangerouslySetInnerHTML={{ __html: course.description ?? "" }}
            /> */}
            {/* <div className="text-gray-500 mt-4 flex items-center text-sm">
              <div className="flex items-center">
                <BookCheck />
                {course.chapters?.length ?? 0} Chapter
              </div>
              <div className="ml-4 flex items-center">
                <Presentation />
                { totalLesson(course) } Video Materi
              </div>
            </div> */}
          </div>
          <div className="px-6 py-4 rounded-full">
            <Button className="w-full text-white">Buka Materi</Button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Course;
