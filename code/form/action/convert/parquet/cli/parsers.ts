import { z } from 'zod'
import { ConvertParquetJsonlCommandInput } from './index'

const FormatParser = z.enum(['parquet', 'jsonl'])

let Model: z.ZodType<ConvertParquetJsonlCommandInput>

export const ConvertParquetJsonlCommandInputParser =
  (): z.ZodType<ConvertParquetJsonlCommandInput> => {
    if (!Model) {
      Model = z.object({
        input: z.object({
          format: FormatParser,
          directory: z.object({ path: z.string() }),
        }),
        output: z.object({
          format: FormatParser,
          directory: z.object({ path: z.string() }),
        }),
        merge: z.boolean().optional(),
        include: z.array(z.string()).optional(),
        help: z.boolean().optional(),
      }) as z.ZodType<ConvertParquetJsonlCommandInput>
    }
    return Model!
  }
