"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"

export interface YearProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  onChange?: (year: number) => void
  minYear?: number
  maxYear?: number
}

const Year = React.forwardRef<HTMLDivElement, YearProps>(
  (
    {
      className,
      value,
      onChange,
      minYear = 0,
      maxYear = new Date().getFullYear(),
      ...props
    },
    ref
  ) => {
    const currentYear = new Date().getFullYear()
    const initialDecade = value
      ? Math.floor(value / 10) * 10
      : Math.floor(currentYear / 10) * 10

    const [currentDecade, setCurrentDecade] = React.useState(initialDecade)
    const [selectedYear, setSelectedYear] = React.useState<number | null>(
      value || null
    )

    const handlePreviousDecade = () => {
      setCurrentDecade((prev) =>
        Math.max(prev - 10, Math.floor(minYear / 10) * 10)
      )
    }

    const handleNextDecade = () => {
      setCurrentDecade((prev) =>
        Math.min(prev + 10, Math.floor(maxYear / 10) * 10)
      )
    }

    const handleYearSelect = (year: number) => {
      setSelectedYear(year)
      setCurrentDecade(Math.floor(year / 10) * 10)
      if (onChange) {
        onChange(year)
      }
    }

    return (
      <div className={cn("p-3", className)} ref={ref} {...props}>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="space-y-4">
            <div className="relative flex items-center justify-center pt-1">
              <div className="text-sm font-medium">
                {currentDecade}-{currentDecade + 9}
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  onClick={handlePreviousDecade}
                  disabled={currentDecade <= Math.floor(minYear / 10) * 10}>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  onClick={handleNextDecade}
                  disabled={currentDecade >= Math.floor(maxYear / 10) * 10}>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              className="grid w-full grid-cols-3 grid-rows-4 gap-y-2"
              role="grid">
              {Array.from({ length: 12 }, (_, i) => {
                const year = currentDecade - 1 + i
                const isDisabled = year < minYear || year > maxYear

                return (
                  <div
                    key={i}
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:rounded-md [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50">
                    {year >= 0 ? (
                      <Button
                        variant="ghost"
                        className={cn(
                          "h-12 w-24 p-0 font-normal aria-selected:opacity-100",
                          {
                            "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30":
                              i === 0 || i === 11,
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground":
                              year === selectedYear,
                            "text-muted-foreground opacity-50": isDisabled,
                          }
                        )}
                        aria-selected={year === selectedYear || undefined}
                        onClick={() => !isDisabled && handleYearSelect(year)}
                        disabled={isDisabled}>
                        <span>{year}</span>
                      </Button>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
Year.displayName = "Year"

export { Year }
