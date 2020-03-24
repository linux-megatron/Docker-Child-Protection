import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { fromJS } from "immutable";
import { format, parseISO } from "date-fns";

import { useI18n } from "../../../i18n";
import { ROUTES, DATE_TIME_FORMAT } from "../../../../config";
import { PageHeading, PageContent } from "../../../page";
import IndexTable from "../../../index-table";

import { NAME, AUDIT_LOG } from "./constants";
import { fetchAuditLogs } from "./action-creators";
import { Filters } from "./components";

const Container = () => {
  const i18n = useI18n();

  const newUserGroupBtn = (
    <Button
      to={ROUTES.lookups}
      component={Link}
      color="primary"
      startIcon={<AddIcon />}
    >
      {i18n.t("buttons.new")}
    </Button>
  );

  const tableOptions = {
    recordType: ["admin", AUDIT_LOG],
    columns: [
      {
        label: i18n.t("audit_log.timestamp"),
        name: "timestamp",
        options: {
          customBodyRender: value => format(parseISO(value), DATE_TIME_FORMAT)
        }
      },
      {
        label: i18n.t("audit_log.user_name"),
        name: "user_name"
      },
      {
        label: i18n.t("audit_log.action"),
        name: "action"
      },
      {
        label: i18n.t("audit_log.description"),
        name: "log_message"
      },
      {
        label: i18n.t("audit_log.record_owner"),
        name: "user_name"
      }
    ],
    options: {
      selectableRows: "none",
      onCellClick: false
    },
    defaultFilters: fromJS({
      per: 20,
      page: 1
    }),
    onTableChange: fetchAuditLogs
  };

  return (
    <>
      <PageHeading title={i18n.t("settings.navigation.audit_logs")}>
        {newUserGroupBtn}
      </PageHeading>
      <PageContent>
        <IndexTable {...tableOptions} />
        <Filters />
      </PageContent>
    </>
  );
};

Container.displayName = NAME;

export default Container;
