import Excel, { Column } from "exceljs";
import { injectable } from "tsyringe";
import {
  ExperienceRegister,
  SearchExperienceRegister,
} from "../models/experience-register";
import { ExperienceRegisterRepository } from "../repositories/experienceRegisterRespository";

@injectable()
export class ExperienceRegisterService {
  constructor(private experienceRepository: ExperienceRegisterRepository) {}

  async createExperienceRegister(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    return this.experienceRepository.createExperienceRegister(
      experienceRegister,
    );
  }

  async updateExperienceRegister(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    return this.experienceRepository.updateExperienceRegister(
      experienceRegister,
    );
  }

  async updateExperienceRegisterStatus(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    return this.experienceRepository.updateExperienceRegisterStatus(
      experienceRegister,
    );
  }

  async searchExperienceRegister(
    search: SearchExperienceRegister,
  ): Promise<any> {
    return this.experienceRepository.searchExperienceRegister(search);
  }

  async deleteExperienceRegister(
    list_json: any,
    lu_user_id: string,
  ): Promise<any> {
    return this.experienceRepository.deleteExperienceRegister(
      list_json,
      lu_user_id,
    );
  }

  async printExperienceRegister(search: SearchExperienceRegister) {
    search.page_index = 0;
    search.page_size = 0;
    const data: ExperienceRegister[] =
      await this.experienceRepository.searchExperienceRegister(search);

    if (data.length > 0) {
      const cols: Partial<Column>[] = [
        {
          key: "serial",
          header: "STT",
        },
        {
          key: "register_id",
          header: "Mã đơn đăng ký",
        },
        {
          key: "branch_name",
          header: "Chi nhánh",
        },
        {
          key: "fullname",
          header: "Tên người đăng ký",
        },
        {
          key: "gender",
          header: "Giới tính",
        },
        {
          key: "level",
          header: "Cấp",
        },
        {
          key: "date",
          header: "Ngày hẹn",
        },
        {
          key: "phone_number",
          header: "Số điện thoại",
        },
        {
          key: "address",
          header: "Địa chỉ",
        },
        {
          key: "detail",
          header: "Chi tiết",
        },
        {
          key: "status",
          header: "Trạng thái",
        },
        {
          key: "created_date_time",
          header: "Ngày tạo",
        },
      ];

      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet("1");

      worksheet.columns = cols;

      const genderMap = new Map<number, string>([
        [1, "Nam"],
        [0, "Nữ"],
      ]);

      const statusMap = new Map<number, string>([
        [0, "Chưa chấp nhận"],
        [1, "Đã chấp nhận"],
        [2, "Đã hủy"],
      ]);

      const convertDate = (date: Date) => {
        return (
          date.getDate().toString().padStart(2, "0") +
          "/" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          date.getFullYear()
        );
      };

      data
        .map((x, i) => ({ serial: i + 1, ...x }))
        .forEach((register) =>
          worksheet.addRow({
            ...register,
            gender: genderMap.get(register.gender),
            status: statusMap.get(register.status),
            date: convertDate(register.date),
            created_date_time: convertDate(register.created_date_time),
          }),
        );

      const font_name = "Times New Roman";

      worksheet.columns.forEach(function (column) {
        column.font = {
          size: 12,
          name: font_name,
        };
        if (column.key) {
          if (/serial|id|date|gender|status/.test(column.key)) {
            column.alignment = { vertical: "middle", horizontal: "center" };
          }

          let maxLength = 0;
          column["eachCell"]!(
            { includeEmpty: true },
            function (cell, rowIndex) {
              if (rowIndex == 1) {
                cell.fill = {
                  type: "pattern",
                  pattern: "darkVertical",
                  fgColor: { argb: "57A0D2" },
                };
              }

              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };

              if (/status/.test(column.key!)) {
                let color = "";

                switch (cell.value) {
                  case statusMap.get(0):
                    color = "faad14";
                    break;
                  case statusMap.get(1):
                    color = "52c41a";
                    break;
                  case statusMap.get(2):
                    color = "ff4d4f";
                    break;
                  default:
                    break;
                }

                if (color !== "") {
                  cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: color },
                  };
                }
              }

              if (!/serial/.test(column.key!)) {
                if (/date/.test(column.key!)) {
                  maxLength = 10;
                } else {
                  let columnLength = cell.value
                    ? cell.value.toString().length
                    : 10;
                  if (columnLength > maxLength) {
                    maxLength = columnLength;
                  }
                }
              }
            },
          );

          if (/serial/.test(column.key)) column.width = 6;
          else column.width = (maxLength < 10 ? 10 : maxLength) + 4;
        }
      });

      worksheet.getRow(1).font = {
        bold: true,
        size: 13,
      };

      worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      const buffer = await workbook.xlsx.writeBuffer();

      return buffer;
    }
  }
}
