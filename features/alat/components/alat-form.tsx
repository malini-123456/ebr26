"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { AlatInput } from "../lib/shcema";
import { FieldGroup } from "@/components/ui/field";

export default function AlatForm () {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <form>
          <FieldGroup></FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}