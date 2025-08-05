import { Button } from "@/components/atomics/button";
import Title from "@/components/atomics/title";
import { useToast } from "@/components/atomics/use-toast";
import CardBooking from "@/components/molecules/card/card-booking";
import { DatePickerDemo } from "@/components/molecules/date-picker";
import { moneyFormat } from "@/lib/utils";
import { useCheckAvailabilityMutation } from "@/services/transaction.service";
import { Loader2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

interface BookingSectionProps {
  id: number;
  price: number;
}

function BookingSection({ id, price }: BookingSectionProps) {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  // declare service transaction
  const [checkAvailability, { isLoading }] = useCheckAvailabilityMutation();
  const { toast } = useToast()

  // menggunakna use memo
  const booking = useMemo(() => {
    let totalDays = 0;
    let subTotal = 0;
    let tax = 0;
    let grandTotal = 0;

    if (startDate && endDate) {
      totalDays = moment(endDate).diff(moment(startDate), "days");
      subTotal = totalDays * price;
      tax = subTotal * 0.1;
      grandTotal = subTotal + tax;
    }

    return {
      totalDays,
      subTotal,
      tax,
      grandTotal,
    };
  }, [startDate, endDate]);


  const handleBooking = async () => {
    try {
      const data = {
        listing_id: id,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      }

      const response = await checkAvailability(data).unwrap();
      console.log(response);
    } catch (error: any) {
      console.log(error);
      if (error === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to access this page",
          variant: "destructive",
          action: (
            <Link href={`/sign-in?callbackUrl=${window.location.href}`}>
              Sign In
            </Link>
          ),
        })
      } else if (error === 403) {
        toast({
          title: "Forbidden",
          description: "You are not authorized to access this page",
          variant: "destructive",
        })
      } else if (error === 404) {
        toast({
          title: "Not Found",
          description: error.data.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="w-full max-w-[360px] xl:max-w-[400px] h-fit space-y-5 bg-white border border-border rounded-[20px] p-[30px] shadow-indicator">
      <h1 className="font-bold text-lg leading-[27px] text-secondary">
        Start Booking
      </h1>
      <span className="leading-6">
        <span className="font-bold text-4xl leading-[54px]">{moneyFormat.format(price)}</span>
        /day
      </span>
      <div className="space-y-5">
        <DatePickerDemo placeholder="Start Date" date={startDate} setDate={setStartDate} />
        <DatePickerDemo placeholder="End Date" date={endDate} setDate={setEndDate} />
      </div>
      <div className="space-y-5">
        <CardBooking title="Total days" value={booking.totalDays + " days"} />
        <CardBooking title="Sub total" value={moneyFormat.format(booking.subTotal)} />
        <CardBooking title="Tax (10%)" value={moneyFormat.format(booking.tax)} />
        <CardBooking title="Grand total price" value={moneyFormat.format(booking.grandTotal)} />
      </div>
      <Button variant="default" className="mt-4" onClick={handleBooking} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Book Now
      </Button>
      <div className="bg-gray-light p-5 rounded-[20px] flex items-center space-x-4">
        <Image src="/icons/medal-star.svg" alt="icon" height={36} width={36} />
        <div>
          <Title
            section="booking"
            title="77% Off Discount"
            subtitle="BuildWithAngga card is giving you extra priviledge today."
          />
        </div>
      </div>
    </div>
  );
}

export default BookingSection;
